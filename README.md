# John Conway's Game of Life

Baseado nas regras do [autômato celular criado por John Conway](https://pt.wikipedia.org/wiki/Jogo_da_vida), fiz a implementação usando [P5.js](https://p5js.org/)

As regras do autômato são simples, onde:

1. Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
2. Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
3. Qualquer célula morta com exatamente três vizinhos vivos se torna uma célula viva.
4. Qualquer célula viva com dois ou três vizinhos vivos continua no mesmo estado para a próxima geração.
