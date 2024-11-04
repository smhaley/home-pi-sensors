import { FastifyRequest } from "fastify";
import { QueryType } from "../constants/data-constants";

interface BaseRequestParams {
  topic: string;
}

interface DataRequestParams extends BaseRequestParams {
  queryType: QueryType;
}

export interface IntervalQuery {
  after?: string;
  before?: string;
  from?: string;
  to?: string;
}

export interface AvgIntervalQuery extends IntervalQuery {
  interval: string;
}

export type QueryLimits = {
  offset?: number;
  size?: number;
};

export type DataRequest = FastifyRequest<{
  Params: DataRequestParams;
  Querystring: IntervalQuery & QueryLimits;
}>;

export type AvgDataRequest = FastifyRequest<{
  Params: BaseRequestParams;
  Querystring: AvgIntervalQuery;
}>;

export type UiSettingsRequest = FastifyRequest<{
  Body: {
    settings?: Record<string, boolean>;
  };
}>;
