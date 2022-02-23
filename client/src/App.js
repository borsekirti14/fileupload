import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div >
      <header>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <div class="form-group">
            <input type="file" class="form-control-file" name="file"/>
            <input type="submit" value="submit" class="btn btn-default"/>            
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
