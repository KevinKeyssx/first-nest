import { Injectable } from "@nestjs/common";

import axios, { AxiosInstance } from "axios";

import { HttpAdapter }      from "../interfaces/http-adapter.interface";
import { handleExceptions } from "src/error/handle-exceptions";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

	#axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.#axios.get<T>( url );
            return data;
        } catch (error) {

            handleExceptions( error );

        }
    }

}