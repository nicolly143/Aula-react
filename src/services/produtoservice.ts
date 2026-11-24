import type { produto, ProdutoRequest } from "../types/produto"
import { api } from "./api"

const produtoService = {
    async listar() {
        const resposta = await api.get<produto[]>('produtos')
        return resposta.data;
    },
async buscar(id: number){
    const resposta = await api.get(`produtos/${id}`)
    return resposta.data;
},

        async cadastrar(dados:ProdutoRequest, arquivo: File){
            const formulario = new FormData();
            formulario.append('nome', dados.nome);
            formulario.append('descricaoCurta', dados.descricaoCurta);
            formulario.append('descricaoLonga', dados.descricaoLonga);
            formulario.append('precoPorkg', String (dados.precoPorKg));
            formulario.append('ativo', String (dados.ativo));
            formulario.append('categotiaIds', JSON.stringify(dados.categoriasIds));
            formulario.append('imagem', arquivo );
            const resposta = await api.post <produto>('produtos', formulario)
            return resposta.data;

        },
async atualizar (id: number, dados:ProdutoRequest){
    const resposta =await api.put<produto>(`produto/${id}`, dados);
    return resposta.data;
},
async excluir(id:number){
    await api.delete(`produto/${id}`)
}
}
export default produtoService