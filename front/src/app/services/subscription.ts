import ISubscriptionUpdateDto from "../../interfaces/ISubscription/ISubscription";
import { api } from "./api";

const subscriptionApi = api.injectEndpoints({
    endpoints: (build) => ({
        renewSub: build.mutation<ISubscriptionUpdateDto, {sub: ISubscriptionUpdateDto}>({
            query: (sub) => ({
                url: "/renew",
                method: "POST",
                body: sub
            }),
            invalidatesTags: ["Sub"]
        }),
    }),
});

export const {
    useRenewSubMutation
} = subscriptionApi;