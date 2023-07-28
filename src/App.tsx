import { JSX, createSignal } from 'solid-js';
import './App.css';

async function getQuotes(): Promise<string | null> {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const results = await response.json();
    console.log(results.value);
    return results.value;
  } catch (error) {
    console.error('Error fetching Chuck Norris joke:', error);
    return null;
  }
}

const imagesArray: string[] = [
  'public/1.jpg',
  'public/2.jpg',
  'public/3.jpg',
  'public/4.jpg',
];

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
}

function App(): JSX.Element {
  const [text, setText] = createSignal<string>('Wanna hear some iron quotes');
  const [imageUrl, setImageUrl] = createSignal<string>(getRandomImage());

  async function fetchQuote(): Promise<void> {
    const quote = await getQuotes();
    if (quote !== null) {
      setText(quote);
      setImageUrl(getRandomImage());
    }
  }

  return (
    <>
      <div class='container'>
        <img class='noris-img' src={imageUrl()} alt='Random' />
        <div class='quote-text'>{text()}</div>
        <button class='fetch-button' onClick={fetchQuote}>
          GIVE IT TO ME
        </button>
      </div>
    </>
  );
}

export default App;
