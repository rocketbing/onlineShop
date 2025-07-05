// 生命周期
// beforeMounted:
// 模版已经编译完成，但还没渲染到DOM节点
// 使用场景: 用于修改即将挂载的DOM的一些属性

// onMounted:
// 组件已经挂载到DOM后，此时可以通过
// 使用场景：适合执行需要访问DOM元素的操作，比如绑定DOM事件, 让input获得焦点等
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
