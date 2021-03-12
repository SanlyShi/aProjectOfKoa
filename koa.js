// const Koa = require('koa');
// const app = new Koa();
// const wait = ()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             // console.log("121312312312")
//             resolve("hehehe")
//         },2000)
//     })
// }
// app.use(async ctx => {
//     wait().then((data=>{
//         console.log(data)
//     }))
//     ctx.body = 'Hello World';
// });
//
// app.listen(3000);


const Koa = require('koa')
const app = new Koa()

app.use(async (ctx,next)=>{
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method}${ctx.url}花费${rt}`)
})

app.use(async (ctx,next)=>{
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time',`${ms}ms`)
})

app.use(async ctx=>{
    ctx.body = '<p style="color:red">一只半夜觅食的猫</p>'
})

app.listen(3000)
