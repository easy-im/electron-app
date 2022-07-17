declare namespace NSAPI {
    namespace NSGlobal {
      interface IResponse<T> {
        data: T;
        errno: number;
        errmsg?: string;
      }
    }
}