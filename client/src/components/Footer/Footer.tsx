import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='max-w-lg bg-primary-focus rounded-lg p-5 flex gap-4 text-lg font-bold fixed bottom-6 right-8'>
      <section>
        <ul>
          <li className='hover:underline'>
            <Link to='/'>Home</Link>
          </li>
          <li className='hover:underline'>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li className='flex gap-2 items-center'>
            <i className='fab fa-github'></i>
            <a
              className='hover:underline '
              href='https://github.com/Vondai'
            >
              Github
            </a>
          </li>
          <li>
            <p className='rights'>Orion &copy; 2022. All rights reserved</p>
          </li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
