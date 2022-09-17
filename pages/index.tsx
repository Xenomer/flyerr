import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.scss'

const GalleryItem = ({ item }) => {
  const [ metadata, setMetadata ] = useState<any>(null)
  const [ link, setLink ] = useState<string>('')

  const onHover = async () => {
    const meta = await fetch(`/api/metadata?key=${item.key}`);
    const data = await meta.json();
    setMetadata(data);
    const imdbCode = data?.Guid?.find(g => g.id.startsWith('imdb'))?.id.split('//')[1];
    setLink(`https://imdb.com/title/${imdbCode}`);
  }
  
  return <div
    key={item.key}
    className={styles.galleryitem}
    onMouseEnter={onHover}
  >
    <Image src={`/api/image?i=${item.thumb}`} layout='fill' />
    <a
      className={styles.galleryitemtitle}
      href={link}
      target='_blank'
      rel='noreferrer'
      style={{
        cursor: link ? 'pointer' : 'progress',
      }}
    >
      <p className={styles.title}>
        {item.title}
      </p>
      <p className={styles.year}>
        {item.year}
      </p>
      <p className={styles.description}>
        {item.summary}
      </p>
    </a>
  </div>
}

const Gallery = ({ library, filter }: { library: string, filter: string }) => {
  const [ items, setItems ] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/libraries/' + library)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [ library ]);

  const filteredItems = useMemo(() =>
    filter
      ? items.filter(item => 
        item.title.toLowerCase().includes(filter.toLowerCase())
        || String(item.year).includes(filter.toLowerCase())
      ) : items
  , [ filter, items ])

  return <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    margin: '1rem',
    justifyContent: 'start',
  }}>
    {filteredItems.map((item) => <GalleryItem key={item.key} item={item} />)}
  </div>
}

const Home: NextPage = () => {
  const [ libraries, setLibraries ] = useState<any[]>([]);
  const [ selectedLibrary, setSelectedLibrary ] = useState(null);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    fetch('/api/libraries')
      .then((res) => res.json())
      .then((data) => {
        setLibraries(data);
        setSelectedLibrary(data[0].key)
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Flyerr - { libraries.find(l => l.key === selectedLibrary)?.title }</title>
        <meta name="description" content="A public overview of your plex catalog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={{ marginLeft: '12px' }}>{ process.env.INDEX_TITLE || 'Plex catalog preview' }</h1>

      <div className={styles.buttons}>
        {libraries.map((library) => (
          <button key={library.key} className={(selectedLibrary === library.key) ? styles.selected : ''} onClick={() => setSelectedLibrary(library.key)}>{library.title}</button>
        ))}
        <p style={{
          color: '#777',
          marginLeft: '16px',
        }}>Search:</p>
        <input
          style={{
            background: 'transparent',
            border: '1px solid #333',
            borderRadius: '4px',
            padding: '16px',
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      { selectedLibrary != null && <div>
        <Gallery library={selectedLibrary} filter={search} />
      </div> }
    </div>
  )
}

export default Home
