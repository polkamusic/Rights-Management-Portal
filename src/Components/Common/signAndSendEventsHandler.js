
const signAndSendEventsHandler = (
        events, 
        notify, 
        api, 
        successMsg='Transaction', 
        callback=null) => {

    if (!events || !api) return

    // errors
    events
        // find/filter for failed events
        .filter(({ event }) =>
            api.events.system.ExtrinsicFailed.is(event)
        )
        // we know that data for system.ExtrinsicFailed is (DispatchError, DispatchInfo)
        .forEach(({ event: { data: [error, info] } }) => {
            if (error.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = api.registry.findMetaError(error.asModule);
                const { documentation, method, section } = decoded;

                notify(`${section}.${method}: ${documentation.join(' ')}`);
            } else {
                // Other, CannotLookup, BadOrigin, no extra info
                notify(error.toString());
            }
        });

    // success
    events.filter(({ event }) =>
        api.events.system.ExtrinsicSuccess.is(event)
    ).forEach(({ event: { data: [info] } }) => {
        if (info) {
            notify(successMsg);
            if (callback) callback(info)
        }
    });

}

export default signAndSendEventsHandler