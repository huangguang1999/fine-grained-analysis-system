# 总结

```javascript
提炼项目中学习到和使用到的技术
```



## 自适应布局

现在主流的两种布局方式：

* 自适应布局

* 响应式布局

本系统不适用于手机端使用，所以使用**自适应布局**，在不同显示屏下的PC端依旧能保持好的用户体验。

自适应布局相对来说实现起来简单，只需要用百分比固定好宽高，在屏幕较窄的情况下出现滚动条拉动即可。

在`webgl`中很难实现响应式布局，因为`canvas`的存在，高度必须设置px值，以及默认层级是在最上面，影响布局，
内嵌的展示组件必须使用`position: absolute`的方式展示（或者`relative`），不是在文档流中，所以基本上布局只能支持PC端，
平板都很难有体验。但是出于使用目的来讲，这些系统绝大部分是使用在大屏可视化方面，所以基本不需要支持多设备。




## 响应式布局

当然，基于正常的非可视化系统，响应式布局的方案还是非常合理的，一套方案即可满足所有设备。



### 1.媒体查询

`css @media`媒体查询可以让我们针对不同的媒体类型定义不同的样式，当重置浏览器窗口大小的过程中，页面也会根据浏览器的高度和宽度重新渲染页面。



#### 选择屏幕大小分割点

通过对不同的设备分辨率去划分不同的布局样式，一般分为小屏幕（0 -480）、中屏幕（481-800）、大屏幕（801-1400）、巨屏幕（1400+）



#### 移动优先/PC优先

不管是移动优先还是PC优先，都是一句当随着屏幕宽度增大或减小的时候，后面的样式会覆盖前面的样式。因此，移动端首先使用的是`min-width`，PC端优先使用的是`max-width`

##### 移动优先：

```css
body {
    background-color: yellow;
}

@media screen and (max-width: 480px) {
    body {
      background-color: red;
    }
}

@media screen and (min-width: 800px) {
    body {
      background-color: #0FF000;
    }
}

@media screen and (min-width: 1400px) {
    body {
      background-color: blue;
    }
}
```

###### PC优先：

```css
body {
    background-color: yellow;
}

@media screen and (max-width: 1400px) {
    body {
        background-color: #FF00FF;
    }
}

@media screen and (max-width: 800px) {
    body {
        background-color: green;
    }
}

@media screen and (max-width: 480px) {
    body {
        background-color: blue;
    }
}
```

样式可能会根据不同的设备还需要调整一下




### 2.百分比布局

通过百分比单位，可以使得浏览器中组件的宽和高随着浏览器的高度变化而变化，从而实现响应式的效果



### 3.rem布局

`rem`是`css3`新增的单位，并且移动端的支持度很高，Android2+、ios5+都支持，`rem`单位都是相对于根元素html的`font-size`来决定的，
根元素的`font-size`相当于提供了一个基准，当页面的size发生变化时，只需要改变`font-size`的值，那么以`rem`为固定单位的元素大小也会发生响应的变化。
因此，如果通过`rem`来实现响应式的布局，只需要根据视图容器的大小，动态的改变`font-size`即可（而`em`是相对于父元素）。



#### rem响应式的布局思想

* 一般不要给元素设置具体的宽度，但是对于一些小图标可以设置具体宽度值

* 高度值可以设置固定值，设计稿有多大，我们就严格有多大

* 所有设置的固定值都用`rem`做单位（首先在html总设置一个基准值：`px`和`rem`的对应比例，然后在效果图上获取`px`值，布局的时候转化为`rem`值）

* js获取真实屏幕的宽度，让其除以设计稿的宽度，算出比例，把之前的基准值按照比例进行重新的设定，这样项目就可以在移动端自适应了

  

#### rem布局的缺点

在响应式布局中，必须通过js来动态控制根元素`font-size`的大小，也就是说`css`样式和`js`代码有一定的耦合性，且必须将改变`font-size`的代码放在`css`样式之前。



### 响应式布局的其他方案

* Flex布局

* Grid网格布局

  

### 响应式布局的要点

实际项目中，我们可能需要综合上面的方案，比如用`rem`来做字体的适配，用`srcset`来做图片的响应式，宽度可以用`rem`、`flex`来实现响应式，
可能还需要利用媒体查询来作为响应式布局的基础，因此综合上面的实现方案，项目中实现响应式布局需要注意下面几点：

* 设置viewpoint

* 媒体查询

* 字体的适配（字体单位）

* 百分比布局

* 图片的适配（图片的响应式）

* 结合flex、grid、bfc、栅格等

  


## 鉴权及持久化存储

此系统根据政府和群众有两套不同的权限系统，政府里面的路由是需要进行鉴权的，而权限数据一般都是登录接口返回的。

使用beforeEach路由钩子进行鉴权



### 基础页面结构

后台管理系统主要分为一个登录页和主页面，主页面里面的路由是需要鉴权的，而权限数据一般都是登录接口返回,下面是部分的路由代码：

```javascript
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/map',
          component: Map,
          meta: { title: '轨迹地图' }
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: { title: '登录' }
    },
    {
      path: '*',
      component: F04,
      redirect: '/404'
    }
  ]
})
```

登录接口返回的权限数据因为在登录刷新之后就没有了，所以需要做一个持久化存储的方案。如果主页的菜单数据和路由数据差别很大，可以写死，
但是不影响我们使用`beforeEach`路由钩子鉴权。



### 改写路由数据

如果说路由数据和菜单的数据相差不多，就可以实现路由数据复用到菜单，我们可以在`router.js`中将路由数据配好，但是不初始化：

代码是和上面的一样，只是在`main.js`中初始化路由数据

```javascript
import Router from "vue-router";
import routes from "./router";//引入路由数据
Vue.use(Router);
const router = new Router({routes});//实例化路由对象
```

改写的话只需要在菜单页把数据格式变动一下就行，`filter`不需要的。



### beforeEach路由钩子鉴权

进入`App.vue`页面的时候就触发`beforeEach`路由钩子的时机，所以第一次登录的时候就必须输入账号和密码才能有页面，另外一种形式是先进入一个主页，
然后跳转的时候触发路由钩子，这种情况需要对页面及一些数据初始化。

```javascript
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` || 'vue-analysis-system'
  const role = localStorage.getItem('ms_username')
  // 判断里面可以根据role跳转不同路由，相当于不同角色有不同的身份
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
```

当然这不是最好的处理方法，如果说存在着不同角色有不同的权限时，需要在菜单栏渲染不同的数据栏以及在菜单栏处理路由钩子，在菜单栏点击的时候还要做权限处理，
避免有的通过 `url` 访问到他不能够访问的页面。

详情可参考github：https://github.com/gongshun/vue-demo/blob/master/src/views/Home.vue



## axios封装实现请求顺序

在很多请求发送出去的时候，因为发送顺序的不同，如何保证收到的顺序是相同的，这个时候就需要封装`axios`。

简单来说：

1. `http`请求拦截
2.  放进队列
3.  当队列中存在正在请求的时候执行取消操作
4.  收到响应后把已完成的请求从`pending`中移除
5.  继续循环



一步一步实现：



首先是`http`请求拦截器，`axios`官方文档中已经说明可以设置拦截器，然后设置好的时候我们需要判断什么是在进行中的请求，需要给个`flag`，然后放进队列。

```javascript
axios.interceptors.request.use(config => {
    removePending(config) // 在一个axios发送前执行一下取消操作
    config.cancelToken = new CancelToken((c) => {
      // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
    })
    return Promise.resolve(config)
  }, error => {
    return Promise.reject(error)
  })
```



在这里我直接把取消方法封装进去，官方文档中也给出了两种方法，这里我使用的是传递一个`executor`函数到`CancelToken`的构造函数中来创建`cancel token`，并把`cancel`函数封装到请求对象中，到时候移除的时候判断出来后执行即可。



所以还需要实现一个`http响应拦截器`，用来接收数据，并且还能移除上一次旧的请求，发送下一次新的请求。



```javascript
axios.interceptors.response.use(data => {
    removePending(data.config) // 在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return Promise.resolve(data)
  })
  instance = axios.create({
    method: '', // 请求方法
    params: {}, // URL参数
    baseURL: '', // url地址
    headers: {// 跨域请求头
      'Access-Control-Request-Headers': '*',
      'Conent-Type': 'UTF-8'
    },
    withCredentials: false, // 是否携带cookies
    timeout: 10000 // 超时
  })
  // 发送网络请求
  return instance(config)
```



### ajax、axios、fetch区别?



**ajax：**

```javascript
var xhr = new XMLHttpRequest()
xhr.open('get', url)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
xhr.send()
```

**fetch:**

`fetch`号称是`ajax`的替代品，它的API是基于`promise`设计的。

```javascript
fetch(url).then(response => {
    if (response.ok) {
        return response.json()
    }
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
```

和`ajax`有主要的三种方式的不同：

* 当接收到一个代表错误的http状态码时，从`fetch()`返回的Promise不会被标记为**reject**，即使响应的http状态码是404或500.相反，它会将Promise状态标记为`resolve`，但是会将`resolve`的返回值的`ok`属性设置为`false`，仅当网络故障时或请求被阻止时，才会标记为`reject`。
* `fetch()`**不会接收跨域cookies**；你也不能使用fetch()建立起跨域会话。其它网站的`set-cookie`头部字段将会被无视。
* `fetch`**不会发送cookies**，除非你使用了`credentials`的初始化选项。



`fetch`是比较底层的API，所以很多情况下，需要自己封装，并不是开箱即用，不支持超时控制。



**axios:**

`axios`是对原生XHR的封装，它的特性：

* 可以在`nodejs`中使用
* 提供了并发请求的接口
* 支持Promise API



文档中有很多写法



并发请求：

```javascript
function getUserAccount () {
    return axios.get('/user/1234')
}

function getUserPermissions () {
    return axios.get('/user/12345/permissions')
}

axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function (acct, perms) {
    // 等到所有请求都完成了执行
}))
```



这是官方的并发案例，这个`all`方法是基于`Promise.all()`的。



## JSON Web Token(目前最流行的跨域认证解决方案)



### 跨域认证的问题



传统的`session`认证的流程一般是：

1. 用户像服务器发送用户名和密码
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个`session_id`，写入用户的`cookie`。
4. 用户随后的每一次请求，都会通过cookie，将`session_id`传回服务器。
5. 服务器收到`session_id`，找到前期保存的数据，由此得知用户的身份。



不过扩展性不好，当面临服务器集群，或者跨域时，`session`就需要数据共享。



A网站和B网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，如何实现？



1. `session`数据持久化，写入数据库或别的持久层。各种服务收到请求后，都像持久层请求数据，这种方案的优点就是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。
2. 服务器不保存`session`数据了，所有数据放在客户端，每次请求都发回服务器。`JWT`就是这种方案的代表。



### 原理

`JWT`的原理是，服务器认证以后，生成一个`JSON`对象，发回给用户。



```json
{
	"name": "hg",
    "role": "government",
    "date": "2018.7.1 00:00"
}
```



之后用户与服务端通信的时候，都要发回这个`JSON`对象。服务器完全只靠这个对象认定身份。为了防止用户纂改数据，服务器在生成这个对象的时候，会加上签名。



服务器就不保存任何`session`数据了，也就是服务器成为无状态，从而比较容易实现扩展。



## JWT数据结构



实际的`jwt`就是一串字符串，有三个部分：



* **header**：头部
* **payload**：负载
* **signature**：签名



`header`是描述`jwt`的属性数据，`payload`存放实际需要传输的数据，`signature`是对前两部分的签名。



## 特点

1.  `JWT`默认是不加密的，但也是可以加密的。生成原始`Token`后，可以用密钥再加密一次；
2.  `JWT`不加密的情况下，不能将秘密写入`JWT`；
3.  `JWT`不仅用于认证，也可以用于交换信息。有效使用`JWT`，可以降低服务器查询数据库的次数；
4.  `JWT`的最大缺点是，由于服务器不保存`session`状态，因此无法在使用过程中废止某个`token`，或者更改`token`的权限。也就是说，一旦`JWT`签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑；
5.  `JWT`本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，`JWT`的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证；
6.  为了减少盗用，`JWT`不应该使用`HTTP`协议明码传输，要使用`HTTPS`协议传输；





`github`栗子：https://github.com/yjdjiayou/jwt-demo










## 微服务

