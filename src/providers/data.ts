// import { DataProvider, BaseRecord, GetListParams, GetListResponse } from "@refinedev/core";
import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";
// import { MOCK_SUBJECTS } from "./constants";
// import { Subject } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";

// export const dataProvider:DataProvider = {
//    getList: async <TData extends BaseRecord = BaseRecord>({resource}:
//     GetListParams): Promise<GetListResponse<TData>> =>{
//       if(resource !== 'subjects')  return {data: [] as TData[], total: 0};

//       return {
//         data: (MOCK_SUBJECTS as Subject[]) as unknown as TData[],
//         total: MOCK_SUBJECTS.length,
//       }

//     },

//   getOne: async() => {throw new Error('This function is not present in mock data') },
//   create: async() => {throw new Error('This function is not present in mock data') },
//   update: async() => {throw new Error('This function is not present in mock data') },
//   deleteOne: async() => {throw new Error('This function is not present in mock data') },

//   getApiUrl: () => "",
// }

const options : CreateDataProviderOptions = {
 getList : {
  getEndpoint : ({ resource }) => resource,
//build query params for search, filtering and pagination

  buildQueryParams: async ({ resource, filters, pagination}) => {
    const page = pagination?.currentPage ?? 1;
    const pageSize = pagination?.pageSize ?? 10;

    const params: Record<string, string | number> = {page, limit: pageSize,};

    filters?.forEach((filter) => {
      const field = 'field' in filter ? filter.field: '';
      const value = String(filter.value);

      if(resource === 'subjects' && field === 'department') {
        params.department = value;
      }

      if(field === 'name' || field === 'code') params.search = value;
    })
    return params;
  },
  
  mapResponse: async (response) => {
    const payload: ListResponse = await response.json();

    return payload.data ?? [];
  },

  getTotalCount: async(response) => {
     const payload:ListResponse = await response.json();
     return payload.pagination?.total ?? payload.data?.length ?? 0;
  }

  }
}

const {dataProvider} = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};