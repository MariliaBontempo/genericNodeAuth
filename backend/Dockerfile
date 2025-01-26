FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Gera o cliente Prisma
RUN yarn prisma:generate

# Adiciona o script de inicialização e dá permissão de execução
COPY init.sh .
RUN chmod +x init.sh

# Expõe a porta que será usada pela aplicação
EXPOSE 4000

# Usa o script de inicialização como comando
CMD ["./init.sh"]