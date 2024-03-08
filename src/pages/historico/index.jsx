'use client'

import fetchHistoricoData from "../../../utils/fetcherHistorico";

const historicoAPI = 'http://localhost:3000/api/historico'; // Substitua pela URL correta do seu ambiente

export default function Historico({ historico }) {
    console.log('Props recebidas:', historico);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString(); // Ou qualquer formato desejado
    };

    // Função para agrupar os jobs por responsável
    const groupJobsByResponsavel = (historico) => {
        const groupedJobs = {};

        historico.forEach((historicoItem) => {
            if (historicoItem.jobs && historicoItem.jobs.length > 0) {
                historicoItem.jobs.forEach((job) => {
                    const responsavel = job.responsavelJob;
                    if (!groupedJobs[responsavel]) {
                        groupedJobs[responsavel] = [];
                    }
                    groupedJobs[responsavel].push({
                        nomeDoJob: job.nomeDoJob,
                        timeStampHistorico: formatTimestamp(job.timeStampHistorico),
                    });
                });
            }
        });

        return groupedJobs;
    };

    const groupedJobs = groupJobsByResponsavel(historico);

    return (
        <div className={`flex flex-col items-center justify-center gap-5 text-center w-screen px-12 py-5`}>
            <h1 className={`text-xl font-bold text-orange-700`}>Histórico de Jobs Concluídos</h1>
            <div className={`flex justify-center items-start gap-5 flex-wrap`}>
                {Object.keys(groupedJobs).map((responsavel, responsavelId) => (
                    <div key={responsavelId} className={`bg-orange-100 px-5 py-2 rounded-md text-sm shadow-sm shadow-slate-400`}>
                        <h2 className={`font-bold text-orange-500`}>{responsavel}</h2>
                        {groupedJobs[responsavel].map((job, jobId) => (
                            <div key={jobId}>
                                <span className={`font-bold text-orange-700`}>
                                    {job.nomeDoJob}
                                </span> - <span className={`font-light text-orange-500`}>{job.timeStampHistorico}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const historicoData = await fetchHistoricoData(historicoAPI);
        console.log('Dados do histórico:', historicoData);

        return { props: { historico: historicoData.historico } };
    } catch (error) {
        console.error('Erro ao buscar dados do histórico:', error);

        return {
            props: {
                historico: [],
                error: 'Erro ao buscar dados do histórico.',
            },
        };
    }
}