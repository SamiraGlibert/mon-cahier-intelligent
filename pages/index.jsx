
import React, { useState, useEffect } from 'react';
import NoteEditor from '../src/composants/éditeur/NoteEditor';

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('matieres');
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [matieres, setMatieres] = useState([]);

  // Charger les matières existantes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mci_sub') || '[]');
    setMatieres(saved);
  }, []);

  if (isLocked) {
    return (
      <div style={{minHeight:'100vh', background:'#0f0e0c', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'sans-serif'}}>
        <h1 style={{fontSize:'32px', marginBottom:'10px'}}>Mon <span style={{color:'#d85a30'}}>Cahier</span></h1>
        <p style={{opacity:0.5, marginBottom:'30px'}}>Application Protégée</p>
        <button 
          onClick={() => setIsLocked(false)}
          style={{background:'#d85a30', color:'white', border:'none', padding:'15px 40px', borderRadius:'16px', fontWeight:'bold', cursor:'pointer'}}
        >
          Déverrouiller
        </button>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', background:'#f7f4ee', fontFamily:'sans-serif', paddingBottom:'80px'}}>
      {/* Barre du haut */}
      <header style={{padding:'20px', background:'white', borderBottom:'1px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center', sticky:'top'}}>
        <h2 style={{margin:0, fontSize:'18px'}}>Mon <span style={{color:'#d85a30'}}>Cahier</span></h2>
        <span style={{fontSize:'12px', color:'#7a7568'}}>{new Date().toLocaleDateString()}</span>
      </header>

      <main style={{padding:'20px', maxWidth:'600px', margin:'0 auto'}}>
        {currentScreen === 'matieres' && (
          <div>
            <h3 style={{fontSize:'14px', color:'#7a7568', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'20px'}}>Mes Matières</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
              {matieres.map((m, i) => (
                <div 
                  key={i} 
                  onClick={() => { setSelectedMatiere(m); setCurrentScreen('note'); }}
                  style={{background:'white', padding:'20px', borderRadius:'20px', borderLeft:`6px solid ${m.color}`, boxShadow:'0 2px 10px rgba(0,0,0,0.05)', cursor:'pointer'}}
                >
                  <div style={{fontWeight:'bold', fontSize:'16px'}}>{m.name}</div>
                  <div style={{fontSize:'12px', color:'#a3a3a3', marginTop:'5px'}}>Ouvrir le cahier</div>
                </div>
              ))}
            </div>
            {matieres.length === 0 && (
              <div style={{textAlign:'center', padding:'40px', color:'#7a7568'}}>
                <p>Aucune matière pour le moment.</p>
                <p style={{fontSize:'12px'}}>Utilisez votre ancien menu pour en ajouter.</p>
              </div>
            )}
          </div>
        )}

        {currentScreen === 'note' && (
          <div>
            <button onClick={() => setCurrentScreen('matieres')} style={{marginBottom:'15px', background:'none', border:'none', color:'#d85a30', fontWeight:'bold', cursor:'pointer'}}>← Retour</button>
            <NoteEditor 
              activeMatiere={selectedMatiere} 
              onSave={(data) => {
                alert("Note sauvegardée ! (Simulation)");
                setCurrentScreen('matieres');
              }} 
            />
          </div>
        )}
      </main>

      {/* Menu du bas */}
      <nav style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e5e7eb', padding:'15px', display:'flex', justifyContent:'space-around'}}>
        <button onClick={() => setCurrentScreen('matieres')} style={{background:'none', border:'none', color: currentScreen === 'matieres' ? '#d85a30' : '#7a7568', fontWeight:'bold'}}>Matières</button>
        <button onClick={() => { setSelectedMatiere(null); setCurrentScreen('note'); }} style={{background:'none', border:'none', color: currentScreen === 'note' ? '#d85a30' : '#7a7568', fontWeight:'bold'}}>Écrire</button>
      </nav>
    </div>
  );
}
