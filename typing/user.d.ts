/** @format */

declare namespace NSUser {
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