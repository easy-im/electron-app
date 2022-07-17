/** @format */

declare namespace NSInputProps {
  /** > 注意：React-Native 端 `inputEventDetail` 仅实现参数 `value`，若需实时获取光标位置则可通过 [`onSelectionChange`](https://reactnative.dev/docs/textinput#onselectionchange) 实现。 */
  interface inputEventDetail {
    /** 输入值 */
    value: string;
    /** 光标位置 */
    cursor: number;
    /** 键值 */
    keyCode: number;
  }
  interface inputValueEventDetail {
    /** 输入值 */
    value: string;
  }
  interface InputProps {
    /** 输入框的初始内容
     */
    value?: string;

    /** input 的类型
     * @default "text"
     */
    type?: "text" | "number";

    /** 是否是密码类型
     */
    password?: boolean;

    /** 输入框为空时占位符
     * @supported weapp, h5, rn
     */
    placeholder?: string;
    /** 是否禁用
     * @supported weapp, h5, rn
     */
    disabled?: boolean;

    /** 最大输入长度，设置为 -1 的时候不限制最大长度
     * @default 140
     * @supported weapp, h5, rn
     */
    maxlength?: number;

    /** 当键盘输入时，触发input事件，event.detail = {value, cursor, keyCode}，处理函数可以直接 return 一个字符串，将替换输入框的内容。
     * @supported weapp, h5, rn
     */
    onInput?: NSCommonCommonEventFunction<InputProps.inputEventDetail>;

    /** 输入框聚焦时触发，event.detail = { value }
     */
    onFocus?: NSCommonCommonEventFunction<InputProps.inputForceEventDetail>;

    /** 输入框失去焦点时触发
     *
     * event.detail = {value: value}
     */
    onBlur?: NSCommonCommonEventFunction<InputProps.inputValueEventDetail>;
  }
}
