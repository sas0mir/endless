import type { EventHandler, EventHandlerRequest } from 'h3';

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    try {
      //todo before handler
      const response = await handler(event);
      //todo after handler
      return response;
    } catch (error) {
      return { error }
    }
  })
