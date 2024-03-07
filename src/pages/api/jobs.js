let historyData = []

export default async function handler(req, res){
    if(req.method === 'POST'){
        try{
            const {name, job} = req.body
            const currentDate = new Date().toISOString().split('T')[0]

            historyData.push({date: currentDate, name, job})
            res.status(200).json({success: true})
        }catch(error){
            console.error(error)
            res.status(500).json({sucess: false, error: 'Erro ao adicionar o Histórico'})
        }
    }else{
        try{
            res.status(200).json({success: true, history: historyData})
        }catch(error){
            console.error(error)
            res.status(500).json({sucess: false, error: 'Erro ao obter o histórico.'})
        }
    }
}