// 'use client'
// import { createContext, useState } from "react"

// export const ClienteContext = createContext()

// function ClienteProvider({children}) {

//   let inicial_id = null
//   let inicial_nome = ""

//   if (localStorage.getItem("cliente_logado")) {
//     const cliente = JSON.parse(localStorage.getItem("cliente_logado"))
//     inicial_id = cliente.id
//     inicial_nome = cliente.nome
//   }

//   const [clienteId, setClienteId] = useState(inicial_id)
//   const [clienteNome, setClienteNome] = useState(inicial_nome)

//   function mudaId(id) {
//     setClienteId(id)
//   }

//   function mudaNome(nome) {
//     setClienteNome(nome)
//   }

//   return (
//     <ClienteContext.Provider value={{clienteId, clienteNome, mudaId, mudaNome}}>
//       {children}
//     </ClienteContext.Provider>
//   )
// }

// export default ClienteProvider
'use client'

import { createContext, useState, useEffect } from "react";

export const ClienteContext = createContext();

function ClienteProvider({ children }) {
  const [clienteId, setClienteId] = useState(null);
  const [clienteNome, setClienteNome] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCliente = localStorage.getItem("cliente_logado");
      if (storedCliente) {
        const cliente = JSON.parse(storedCliente);
        setClienteId(cliente.id);
        setClienteNome(cliente.nome);
      }
    }
  }, []);

  function mudaId(id) {
    setClienteId(id);
  }

  function mudaNome(nome) {
    setClienteNome(nome);
  }

  return (
    <ClienteContext.Provider value={{ clienteId, clienteNome, mudaId, mudaNome }}>
      {children}
    </ClienteContext.Provider>
  );
}

export default ClienteProvider;
