import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen'

/**
 * Compile a template.
 *
 * @param {String} template
 * @param {Object} options
 *                 - warn
 *                 - directives
 *                 - isReservedTag
 *                 - mustUseProp
 *                 - getTagNamespace
 *                 - delimiters
 */
export function compile (template, options) {
  /**
   * 解析模板转换为json格式的对象
   * ast 是应该是一个json对象 保存了html元素中的数据
   **/
  const ast = parse(template.trim(), options)

  /**
   * 优化静态元素和静态attribute
   */
  optimize(ast, options)

  /**
   * 把描述html格式的json字符串 转为优化过的json格式
   */
  return generate(ast, options)
}
