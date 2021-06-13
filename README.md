# John Conway's Game of Life

Veja a demo [aqui](https://conway-game-p5js.netlify.app/)!

[![Netlify Status](https://api.netlify.com/api/v1/badges/742b0726-e7e4-4b11-b472-ed9d96745596/deploy-status)](https://app.netlify.com/sites/conway-game-p5js/deploys)

Baseado nas regras do [autômato celular criado por John Conway](https://pt.wikipedia.org/wiki/Jogo_da_vida), fiz a implementação usando [P5.js](https://p5js.org/).

As regras do autômato são simples, onde:

1. Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
2. Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
3. Qualquer célula morta com exatamente três vizinhos vivos se torna uma célula viva.
4. Qualquer célula viva com dois ou três vizinhos vivos continua no mesmo estado para a próxima geração.
