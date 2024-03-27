import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [showApps, set_showApps] = useState(false);
  const [page, set_page] = useState('Home');
  const [REPORT_STARTED, set_REPORT_STARTED] = useState(false);
  const [to_dos, set_to_dos] = useState([
    /**
     * { key: 0, value; 'something' }
     */
  ])

  useEffect(() => {
    set_showApps(true);
    
    (async () => {
      await document.requestStorageAccess()
    })();
  }, [])
  
  return (
    <main>
    {showApps && <div id="apps"
    tabIndex={-1}
    onMouseOver={(e: any) => {
      const tooltip = document.getElementById('tooltip');
      tooltip!.style.left = `calc(${e.target.getBoundingClientRect().right}px + 0.5vw)`;
      tooltip!.style.top = `calc(${e.target.getBoundingClientRect().top}px + 0vw)`;
      tooltip!.textContent = e.target.getAttribute('data-name');
      setTimeout(() => {
        if(e.target.getAttribute('data-name')){
          tooltip!.style.visibility = 'visible';
        }else {
          tooltip!.style.visibility = 'hidden';
        }
      }, 1000)
    }}
    onMouseOut={() => {
      const tooltip = document.getElementById('tooltip');
      tooltip!.style.visibility = 'hidden';
    }}
    
    onClick={(e: any) => {
      if(e.target.id !== 'apps'){
        set_page(e.target.id);
      }
    }}
    >
    <button className={page == 'Home' ? 'selected': ''} id='Home' draggable data-name='Home' type='button'><i className="bi bi-house"></i></button>
    <button className={page == 'Track' ? 'selected': ''} id='Track' draggable data-name='Track' type='button'><i className="bi bi-clock-history"></i></button>
    <button className={page == 'To-Do' ? 'selected': ''}  id='To-Do' draggable data-name='To-Do' type='button'><i className="bi bi-check2-square"></i></button>
    <button className={page == 'Note-Book' ? 'selected': ''} id='Note-Book' draggable data-name='Note-Book' type='button'><i className="bi bi-journal-bookmark"></i></button>
    <button className={page == 'Work-Out' ? 'selected': ''} id='Work-Out' draggable data-name='Work-Out' type='button'><i className="bi bi-earbuds"></i></button>
    <button className={page == 'Tasks' ? 'selected': ''} id='Tasks' draggable data-name='Tasks' type='button'><i className="bi bi-list-task"></i></button>
    <button className={page == 'Alarm' ? 'selected': ''} id='Alarm' draggable data-name='Alarm' type='button'><i className="bi bi-alarm"></i></button>

    <div id='indicator'></div>
    

    <button className={page == 'Setting' ? 'selected': ''}
    style={{
      position: 'fixed',
      bottom: '4vh'
    }}
    id="Setting" data-name='Setting' type='button'><i className="bi bi-gear"></i></button>      
    </div>}
    

    <div id="tooltip">
    </div>  


    {/* pages and apps */}

    {page == "Home" && <div className='page'>
      <h1>👋 Hello, Yafet</h1>
      <hr />
      <div style={{ display: 'flex'}}>
      <div className="card news">
        <h2>What's New</h2>
        <p className='list'>New Feature of message added in the tool bar</p>
        <p className='list'>Work Collaborate and make All Projects under control.</p>
      </div>

      <div className='card report'>
        <h2>Listen Reports From <span style={{ color: 'red'}}>Reporter</span></h2>
        <img alt='reporter' src="/reporter.jpg" /> 
        <br /> 
        <button className='start'
        onClick={async (e: any) => {
          if(!REPORT_STARTED) {
            const audio = new Audio('/report.mp3');
            await audio.play();
            e.target.innerHTML = '<i class="bi bi-stop-circle"></i> Stop'
            e.target.disabled = 'false';
          audio.addEventListener('ended', () => {
            e.target.textContent = 'Done!';
            setTimeout(() => {
              set_REPORT_STARTED(false)
              e.target.innerHTML = '<i class="bi bi-skip-backward-circle"></i> Restart'
              e.target.disabled = false;
            }, 1000)
          })
          }
        }}
        ><i className="bi bi-play-circle"></i> Start</button>
      </div>
      </div>

      <div className="card notification">
        <h2>Notification</h2>
        <div className="lists">
        <div className="activity">New Task Added
        <span>At 2:00PM Jan 02 2024</span></div>
        <div className="activity">Task Completed
        <span>At 9:00AM Jan 01 2024</span></div>
        <div className="activity">Mike Just Added New Task For You
        <span>At 2:00PM Today</span>
        </div>
        <div className="activity">Mike Just Added New Task For You
        <span>At 2:00PM Today</span>
        </div>
        <div className="activity">Mike Just Added New Task For You
        <span>At 2:00PM Today</span>
        </div>
        <div className="activity">Mike Just Added New Task For You
        <span>At 2:00PM Today</span>
        </div>
        </div>
        <button className='open'>Open</button>
      </div>
      </div>}

      {page == "Track" && <div className='page'>
      <h1>Track</h1>
      <hr />
      <div className="card">
        <h2>What's New</h2>
        <p>New Feature of message added in the tool bar</p>
        <p>Work Collaborate and make All Projects under control.</p>
      </div>
      </div>}

      {page == "To-Do" && <div className='page'>
      <h1>To-Do</h1>
      <hr />
      
      <ul className='to-do-lists'>
        {to_dos.map((each: any) => <label
        onChange={(e: any) => {
          if(document.getElementById('check-box-' + each.key)!.value == 'on'){
            document.getElementById('check-box-' + each.key)!.parentElement!.style.textDecoration = 'none';
          }else {
            console.log(document.getElementById('check-box-' + each.key)!.value)
            e.target.style.textDecoration = 'line-through'
          }
        }}
        key={each.key} className='list'><input id={'check-box-' + each.key} style={{ pointerEvents: 'none'}} type="checkbox" /> {each.description}</label>)}
      </ul>
      <input className='to-do-input'
      onKeyDown={(e: any) => {
        if(e.key == 'Enter'){
          set_to_dos([
            ...to_dos,
            { key: to_dos.length + 2,
              description: e.target.value 
            }
          ])
          e.target.value = ''
        }
      }}
      type="text" placeholder='Add To-Do here' />
      
      </div>}

      {page == "Note-Book" && <div className='page'>
      <h1>Note-Book</h1>
      <hr />
      <h2>My Note Books</h2>
      </div>}

      {page == "Work-Out" && <div className='page'>
      <h1>Work-Out</h1>
      <hr />
      <div className="card videos">
      <div className="workout-video">
        <h2>Morning Workout With BullyJuice</h2>
        <iframe
        style={{
          border: 'none',
          borderRadius: '0.5vw',
          height: '20vw'
        }}
        src="https://www.youtube.com/embed/3sEeVJEXTfY?si=OHKrjuVjN0DDYgtE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>        
        <div className='time'>10+ Min</div>
        </div>

        <div className="card workout-video">
        <h2>Fast Morning Exercises for Full Body</h2>
        <iframe
        style={{
          border: 'none',
          borderRadius: '0.5vw',
          height: '20vw'
        }}
        src="https://www.youtube.com/embed/9o0UPuDBM8M?si=-qJGC1gjfGm7z21Z" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>                
        <div className='time'>15+ Min</div>
        </div>
      </div>
      </div>}

      {page == "Tasks" && <div className='page'>
      <h1>Tasks</h1>
      <hr />
      <div className="card">
        <h2>What's New</h2>
        <p>New Feature of message added in the tool bar</p>
        <p>Work Collaborate and make All Projects under control.</p>
      </div>
      </div>}

      {page == "Alarm" && <div className='page'>
      <h1>Alarm</h1>
      <hr />
      <div className="card">
        <h2>What's New</h2>
        <p>New Feature of message added in the tool bar</p>
        <p>Work Collaborate and make All Projects under control.</p>
      </div>
      </div>}

      {page == "Setting" && <div className='page'>
      <h1>Setting</h1>
      <hr />
      <div className="card">
        <h2>What's New</h2>
        <p>New Feature of message added in the tool bar</p>
        <p>Work Collaborate and make All Projects under control.</p>
      </div>
      </div>}

    </main>
  )
}

export default App
