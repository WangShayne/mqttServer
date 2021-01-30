const port = 1883

const list = [
    /**
     *  temp
     * {
            desc:"",
            request:"",
            response:"",
            body:""
        },
     */
    
    // 查询版本信息
    {
        desc:"查询版本信息返回",
        request: "app/get/request/database/version",
        response: "database/get/response/app/version",
        body: {
            "version": "2.1",
            "Compatible": "1.0"
        }
    },
]

module.exports = {
    port,
    list
}