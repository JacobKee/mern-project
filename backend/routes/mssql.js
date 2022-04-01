const sql = require('mssql')
const router = require('express').Router();

const config = {
    user: 'sa',
    password: 'Pa$$w0rd',
    server: '10.253.196.76', // You can use 'localhost\\instance' to connect to named instance
    database: 'App_CTS', 
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

router.route('/').get( async (req, res) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result =await sql.query('select * from Master_Entity')
        res.json(result.recordsets[0]);
    } catch (err) {
        console.log(err)
    }
})

router.route('/getReportData').get(async (req, res) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        let pool = await sql.connect(config)
        const result = await pool.request()
            .input('year', req.query.year)
            .input('userid', req.query.userid)
            .execute(`GetReportData`);
        res.json(result.recordsets[0]);
    } catch (err) {
        console.log(err)
    }
})


module.exports = router