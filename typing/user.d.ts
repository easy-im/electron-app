/** @format */

declare namespace NSUser {
  namespace NsApi {
    interface IRegisterPost {
      mobile: string;
      nickname: string;
      password: string;
    }
    interface ILoginPut {
      mobile: string;
      password: string;
    }
  }
  interface IInfo {
    id: number;
    nickname: string;
    mobile: number;
    avatar: string;
    gender: 0 | 1;
    token: string;
    client_id: string;
    client_type: string;
    create_time: number;
    update_time: number;
    status: number;
  }
}
