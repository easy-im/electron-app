/** @format */

declare namespace NSCommon {
  interface Target {
    /** 事件源组件的id */
    id: string;
    /** 当前组件的类型 */
    tagName: string;
    /** 事件源组件上由data-开头的自定义属性组成的集合 */
    dataset: {
      [key: string]: any;
    };
  }
  
  interface BaseEventOrig<T = any> {
    /** 事件类型 */
    type: string;

    /** 事件生成时的时间戳 */
    timeStamp: number;

    /** 触发事件的组件的一些属性值集合 */
    target: Target;

    /** 当前组件的一些属性值集合 */
    currentTarget: currentTarget;

    /** 额外的信息 */
    detail: T;

    /** 阻止元素发生默认的行为 */
    preventDefault: () => void;

    /** 阻止事件冒泡到父元素,阻止任何父事件处理程序被执行 */
    stopPropagation: () => void;
  }

  type BaseEventOrigFunction<T> = (event: BaseEventOrig<T>) => void;

  type CommonEventFunction<T = any> = BaseEventOrigFunction<T>;
}
