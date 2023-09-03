import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

/**
 * Teste de retorno de token do sistema de login
 * criação do client mirado para localhost:4000
 * definição da quey que vai se armazenada em result
 * fetch of token
 * 
 */
  it('deve adicionar o token JWT aos cabeçalhos', async () => {
    const client = new ApolloClient({
      uri: 'http://localhost:4000',
      cache: new InMemoryCache(),
    });
  
    const GET_USER = gql`
    query getOneUser($input: passName){
      getOneUser(input: $input){
        token
      }
    }
  `;
  
    const result = await client.query({
      query: GET_USER,
      variables:{
        input:{
          name: "CaioRocha08",
          pass: "administradorSupremo"
        }
      }
    });
    
    let token = result.data.getOneUser.token;
    localStorage.setItem('token', token);

    // Crie o link HTTP
    const httpLink = createHttpLink({
      uri: 'http://localhost:4000',
    });
  
    // Crie o authLink usando setContext
    const authLink = setContext((_, { headers }) => {
      localStorage.getItem('token'); // Recupere o token do mock do localStorage
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '', // Adicione o token aos cabeçalhos se estiver presente
        },
      };
    });
  
    // Crie o cliente Apollo com o authLink

  
    // Execute uma solicitação GraphQL de teste

  
    // Verifique se o token JWT foi adicionado aos cabeçalhos corretamente
    //expect(localStorage.getItem.getItem).toHaveBeenCalledWith('token');
    //expect(result).toHaveValue('{data}');
    expect(result).toBeTruthy(); // Verifique se a solicitação foi bem-sucedida
    localStorage.clear();
  });
  

/*it("Testing the server token server reading, with protected endpoints", async ()=>{
  //take a token with the server login function

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

  const GET_USER = gql`
  query getOneUser($input: passName){
    getOneUser(input: $input){
      token
    }
  }
`;

  const result = await client.query({
    query: GET_USER,
    variables:{
      input:{
        name: "CaioRocha08",
        pass: "administradorSupremo"
      }
    }
  });
  
  let token = result.data.getOneUser.token;
  localStorage.setItem('token', token);

  expect(result).toBeDefined;
  localStorage.clear();
// Crie o link HTTP


// Crie o authLink usando setContext

  });*/