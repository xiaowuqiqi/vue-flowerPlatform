README.md

#[flowerPlatform](https://github.com/wallacety/vue-flowerPlatform/commit/886920dfd2a458332678ce211437523a40dce361)

### 鲜花售花系统

这是我的第一个vue项目，技术栈采用vue+Node+Mongodb组合。前端使用vue-cli脚手架工具快速建站，通过使用proxyTable代理跨域请求后端数据，后端根据url进行路由转发，完成业务处理。



### 使用说明

1，下载数据库的文档（db文件夹）

使用Mongodb的mongoimport工具导入所有文档。库名：db_flower

> 温馨提示
>
> 语法：
>
> `mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field`
>
> 参数说明：
>
> `-d` ：数据库名 。`-c `：collection名。`--type` ：导入的格式默认json。`-f` ：导入的字段名。 `--headerline` ：如果导入的格式是csv，则可以使用第一行的标题作为导入的字段。`--file `：要导入的文件
>
> 示例：
>
> `sudo mongoimport -d mongotest -c users --file /home/mongodump/articles.json --type json`

或者直接使用第三方工具

> 温馨提示
>
> 如：NoSQLBooster for MongoDB第三方工具的导入
>
> Import->import from JSON->File加载json文件

2，下载前端项目源码（flower文件夹）

> 在flower文件夹目录内
>
> `npm install`
>
> 运行
>
> `npm run dev`

3，下载后端项目源码（flowerServer文件夹）

> 在flower文件夹目录内
>
> `npm install`
>
> 运行
>
> `npm run start`
