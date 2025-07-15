export function NotFound() {

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-background">
      <div className="flex flex-col w-100 h-100 items-center justify-center bg-white  rounded-2xl">
        <h1 className="text-gray-100 font-semibold text-2xl mb-10">
          Op's Essa página não existe. 😱
        </h1>
        <a 
         href="/"
         className="font-semibold text-center text-orange-base
         hover:text-gray-300 transition ease-linear"
        > 
          Clique aqui para voltar!
        </a>

      </div>
    </div>
  )
}