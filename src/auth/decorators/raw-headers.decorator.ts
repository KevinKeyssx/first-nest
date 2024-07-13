import {
    createParamDecorator,
    ExecutionContext,
} from "@nestjs/common";


export const RawHeaders = createParamDecorator(
    ( _, ctx: ExecutionContext ): string[] => ctx.switchToHttp().getRequest().rawHeaders
);