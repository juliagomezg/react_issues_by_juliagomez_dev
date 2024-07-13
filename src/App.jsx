import React, { useState, useEffect } from 'react'

const App = () => {
  // api url 
  let url = 'https://api.github.com/repos/facebook/react/issues'

  // array donde guardamos los issues 
  const [issues, setIssues] = useState([]);
  const [searchValue, setSearchValue] = useState('');



  // fetch de los datos 
  useEffect(() => {
    const getIssues = async () => {
      try {
        const response = await fetch(`${url}`);
        const data = await response.json(); //JSON.parse(response)
        setIssues(data)

      } catch (error) {
        console.log(error);
        alert(error);
      };

    };

    getIssues();

  }, []);

  const filtetedIssues = issues.filter(issue => {

    return issue.title.toLowerCase().includes(searchValue.toLowerCase());
  });




  return (
    <>
      <div className='flex flex-col items-center justify-center  m-2'>
        <h1 >React Issues</h1>
        <p>
          This is a list of issues brought from the react issues API on github.
          Click on a Title to visit it's page.
        </p>
      </div>
      <form className="max-w-md mx-auto m-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for an Issue"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />

        </div>
      </form>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>

            </tr>
          </thead>
          <tbody>
            {filtetedIssues.map((issue) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {issue.number}
                </th>
                <td className="px-6 py-4">
                  <a className="hover:text-blue-400" href={issue.html_url} target='_blank'  >
                    {issue.title}
                  </a>
                </td>
                <td className="px-6 py-4">
                  {issue.user.login}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default App