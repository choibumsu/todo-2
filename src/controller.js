const { fetchColumn } = require('./model')

exports.column=async (req,res,next)=>{
  const rows= await fetchColumn()
  res.json(rows)
}