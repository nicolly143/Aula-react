export type produto = {
    id: number;
    nome: string;
    descricaoCurta: string;
    descricaoLonga: string;
    precoPorKg: number;
    ativo: boolean;
    imagem: string;
    categoriasIds: number[]
}
export type ProdutoRequest = Omit<produto,'id'>