import { DataProvider, BaseRecord, GetListParams, GetListResponse } from "@refinedev/core";
import { MOCK_SUBJECTS } from "./constants";
import { Subject } from "@/types";

export const dataProvider:DataProvider = {
   getList: async <TData extends BaseRecord = BaseRecord>({resource}:
    GetListParams): Promise<GetListResponse<TData>> =>{
      if(resource !== 'subjects')  return {data: [] as TData[], total: 0};

      return {
        data: (MOCK_SUBJECTS as Subject[]) as unknown as TData[],
        total: MOCK_SUBJECTS.length,
      }

    },

  getOne: async() => {throw new Error('This function is not present in mock data') },
  create: async() => {throw new Error('This function is not present in mock data') },
  update: async() => {throw new Error('This function is not present in mock data') },
  deleteOne: async() => {throw new Error('This function is not present in mock data') },

  getApiUrl: () => ""
}
