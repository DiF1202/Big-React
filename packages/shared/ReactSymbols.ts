/* eslint-disable prettier/prettier */

// 防止别人滥用Reactsymbols
const supportSymbol = typeof Symbol === 'function' && Symbol.for

// 判断是否支持Symbol这个类型 支持的话就直接用不支持就用数字表示
export const REACT_ELEMENT_TYPE = supportSymbol ? Symbol.for('react.element') : 0xeac7