import './ListaProdutos.css';
import Card from '../../components/card/Card';
// import imgProduto from '../../assets/img/produtos/le_grand_chocolat.png'
import { useEffect, useState } from 'react';
import type { produto } from '../../types/produto';
import produtoService from '../../services/produtoservice';
import {useSearchParams } from 'react-router-dom';

function ListaProdutos() {
    const [produtos, setProdutos] = useState<produto[]>([]);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [parametros] = useSearchParams();
    const busca = (parametros.get('q') ?? '').toLocaleLowerCase('pt-BR');
    const categorias = Number(parametros.get('categorias'))


    useEffect(() => {
        Promise.call
        produtoService.listar()
            .then(lista => { setProdutos(lista), console.log(lista) })
            .catch(() => setErro("Não foi possivel carregar os produtos!"))
            .finally(() => setCarregando(false));
    }, [])

const visiveis = produtos.filter(produtos =>
    produtos.ativo && (!categorias || produtos.categoriasIds.includes(categorias) )&& (
        !busca || `${produtos.nome} ${produtos.descricaoCurta}`.toLocaleLowerCase
('pt-BR').includes(busca)    )
)


    return (
        <>
            <main>
                <section className="prod_banner"></section>

                <section className="container prod_container">
                    <div className="box_h2">
                        <h1>Nossos Bolos</h1>
                        <span>Nos Gâteaux</span>
                        <hr />
                    </div>
                    {carregando && <p>carregando produto...</p>}
                    {!carregando && !erro && produtos.length == 0 && <p>Nenhum produto encontrado.</p>}
                    <div className="prod_cards">
                        {visiveis.map(produto => {
                            return <Card
                                id={produto.id}
                                key={produto.id}
                                imgProduto={`http://localhost:3000${produto.imagem}`}
                                nome={produto.nome}
                                descricao={produto.descricaoCurta}
                                valor={produto.precoPorKg}
                                quantidadeAvaliacoes={10}
                                nota={9.5} />
                        })}



                        {/* <article className="prod_card">
                    <figure>
                        <img src={} alt="foto do produto"/>
                    </figure>
                    <h2>
                        <Link to="/detalheProduto">

                        </Link>
                    </h2>
                    <p className="card_desc">Mousse de chocolate belga 70%, praliné de avelãs e biscuit de cacau.</p>
                    <p className="card_rodape">
                        <data value="185.00">R$ 185,00 / kg</data>
                        <span className="card_av">
                            <img src={usuario} alt="icone de usuarios"/>
                            <data value="10">10</data>
                            <img src={estrela} alt="icone de estrela"/>
                            <data value="9.5">9,5</data>
                        </span>
                    </p>
                </article> */}
                    </div>
                </section>
            </main>
        </>
    )

}

export default ListaProdutos;