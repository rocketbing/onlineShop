// 生命周期
// beforeMounted:
// 模版已经编译完成，但还没渲染到DOM节点
// 使用场景: 用于修改即将挂载的DOM的一些属性

// onMounted:
// 组件已经挂载到DOM后，此时可以通过
// 使用场景：适合执行需要访问DOM元素的操作，比如绑定DOM事件, 让input获得焦点，axios请求等
// 注意：如果在本阶段发现获取DOM为null的情况，说明可能有异步渲染延迟，使用nextTick()解决

// beforeUpdate:
// 组件数据已经更新，但DOM尚未更新
// 使用场景: 可用于在数据更新之前进行一些准备工作

// updated:
// DOM完成重新渲染
// 使用场景: 比如重新计算一些基于新DOM结构布局信息，或者对更新后的DOM进行进一步的样式调整

// beforeUnMount:
// 在组件实例被卸载之前调用，此时组件依然存在，可以访问组件的属性和方法
// 使用场景: 在销毁前读取DOM

// unMounted:
// 组件实例被销毁
// 使用场景: 清除定时器，事件监听 (clearInterval(timer)), window.removeEventListener(...)

// computed
// 缓存，computed里的依赖数据发生变化才会调用
//   :type="item.type"
//         :placeholder="item.placeholder"
//         v-model="registForm[item.model]"
//         :pattern="item.pattern"
//         :required="item.required"
//         :options="item.options"
//         :name="item.model"
//         :id="item.model"

// 项目相关注意点总结:
// 1. CustomInput封装实现双向绑定方法: :modelValue = "" + @input/@change = emit("updateModelValue", newValue)
// 2. v-if和v-else-if的区别，v-else-if只取第一个匹配条件的组件, v-if会渲染所有符合条件的组件
// 3. slot的位置
// 4. 封装好组件之后要注意检查删除原组件里多余无用的代码和import引入
// 5. CustomInput组件上的state负责展示通过验证前后样式的(未通过显示红色边框，通过之后变为绿色+对钩)
//    validFeedback上的state负责展示验证失败错误信息
// 6. rules里confirmPassword的sameAs规则需要传入一个computed的passwordvalue值，这样可以实时监测到值的变化
// 7. rules里的自定义规则名字一般要按照满足规则所达到的效果来制定，比如mustContainOneLetter
// 8. BFormInvalidFeedback一般是按照v-if特定的条件来渲染特定的错误信息，比如不满足required要求显示必填，满足required但没有大写字母显示需要大写字母
// 9. 当store里有token的时候，放在axios请求拦截器的请求头
// 10. axios请求拦截器请求头还可以设置数据类型，告诉后端要发送什么类型的数据
// 11. Errormessage显示的样式(elment plus)一般封装在axios里，因为每次axios请求都要用到
// 12. axios不同的错误代码应该对应不同的处理方式，比如401要清除本地token，并且跳转到login
