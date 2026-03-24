import React, { useState, useEffect } from 'react';
import NoteEditor from '../src/composants/éditeur/NoteEditor';

// CONFIGURATION DES ACCÈS RÉGLEMENTÉS
const FAMILY_CODES = ['FAM-SAMIRA-01', 'FAM-MARI-02', 'FAM-FILS-03', 'FAM-FILLE-04'];
const CLIENT_CODES = [
  'SAG-ADM-0000', 'SAG-2024-A1B2', 'SAG-2024-C3D4', 'SAG-2024-E5F6', 'SAG-2024-G7H8', 
  'SAG-2024-J9K1', 'SAG-2024-L2M3', 'SAG-2024-N4P5', 'SAG-2024-Q6R7', 'SAG-2024-R8S9', 
  'SAG-2024-T1U2', 'SAG-2025-A8B9', 'SAG-2025-C1D2', 'SAG-2025-E3F4', 'SAG-2025-G5H6', 
  'SAG-2025-J7K8', 'SAG-2025-L9M1', 'SAG-2025-N2P3', 'SAG-2025-Q4R5', 'SAG-2025-S6T7', 
  'SAG-2025-U8V9', 'SAG-2025-W1X2', 'SAG-2025-Y3Z4', 'SAG-2025-B5C6', 'SAG-2025-D7E8', 
  'SAG-2025-F9G1', 'SAG-2025-H2J3', 'SAG-2025-K4L5', 'SAG-2025-M6N7', 'SAG-2025-P8Q9', 
  'SAG-2025-R1S2', 'SAG-2026-A1B2', 'SAG-2026-C3D4', 'SAG-2026-E5F6', 'SAG-2026-G7H8', 
  'SAG-2026-J9K1', 'SAG-2026-L2M3', 'SAG-2026-N4P5', 'SAG-2026-Q6R7', 'SAG-2026-R8S9', 
  'SAG-2026-T1U2', 'SAG-2026-V3W4', 'SAG-2026-X5Y6', 'SAG-2026-Z7A8', 'SAG-2026-B9C1', 
  'SAG-2026-D2E3', 'SAG-2026-F4G5', 'SAG-2026-H6J7', 'SAG-2026-K8L9', 'SAG-2026-M1N2', 'SAG-2026-P3Q4'
];

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [activationCode, setActivationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleActivation = () => {
    const code = activationCode.trim().toUpperCase();

    // 1. ACCÈS PRIORITAIRE (FAMILLE)
    if (FAMILY_CODES.includes(code)) {
      localStorage.setItem('mci_active_licence', code);
      setIsLocked(false);
      return;
    }

    // 2. VÉRIFICATION DE LA LICENCE CLIENT
    if (CLIENT_CODES.includes(code)) {
      const deviceFingerprint = btoa(navigator.userAgent).substring(0, 16);
      const storageKey = `auth_registry_${code}`;
      let devices = JSON.parse(localStorage.getItem(storageKey) || "[]");

      if (!devices.includes(deviceFingerprint)) {
        if (devices.length >= 2) {
          // MESSAGE OFFICIEL DE RESTRICTION
          setErrorMessage("Limite de licence atteinte : Ce code d'activation est déjà associé au nombre maximal d'appareils autorisés (2). Veuillez contacter l'administration pour toute assistance.");
          return;
        }
        devices.push(deviceFingerprint);
        localStorage.setItem(storageKey, JSON.stringify(devices));
      }

      localStorage.setItem('mci_active_licence', code);
      setIsLocked(false);
    } else {
      // MESSAGE DE CODE INVALIDE
      setErrorMessage("Identifiant de licence non reconnu. Pour obtenir une clé d'activation valide, veuillez contacter Samira Aït Aoudia Glibert au 06 19 64 09 19.");
    }
  };

  if (isLocked) {
    return (
      <div style={{minHeight:'100vh', background:'#0f0e0c', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'sans-serif', padding:'30px', textAlign:'center'}}>
        <div style={{marginBottom:'40px'}}>
          <h1 style={{fontSize:'32px', fontWeight:'800', letterSpacing:'-1px', marginBottom:'8px'}}>Mon <span style={{color:'#d85a30'}}>Cahier</span></h1>
          <div style={{width:'40px', height:'2px', background:'#d85a30', margin:'0 auto'}}></div>
        </div>
        
        <div style={{background:'#1a1917', padding:'30px', borderRadius:'24px', width:'100%', maxWidth:'380px', border:'1px solid #2a2927'}}>
          <p style={{color:'#fff', fontSize:'15px', marginBottom:'20px', fontWeight:'500'}}>Activation du produit</p>
          
          <input 
            type="text" 
            placeholder="Clé de licence (Ex: SAG-...)" 
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            style={{padding:'16px', borderRadius:'14px', border:'1px solid #3a3937', background:'#0f0e0c', width:'100%', boxSizing:'border-box', color:'white', textAlign:'center', fontSize:'16px', marginBottom:'15px', outline:'none'}}
          />

          {errorMessage && (
            <div style={{color:'#ff5f57', background:'rgba(255,95,87,0.1)', padding:'14px', borderRadius:'12px', fontSize:'12px', marginBottom:'20px', lineHeight:'1.5', textAlign:'left', border:'1px solid rgba(255,95,87,0.2)'}}>
              <strong>Note de sécurité :</strong> {errorMessage}
            </div>
          )}

          <button onClick={handleActivation} style={{background:'#d85a30', color:'white', border:'none', padding:'16px', borderRadius:'14px', fontWeight:'700', cursor:'pointer', width:'100%', fontSize:'15px', transition:'0.2s'}}>
            Vérifier la licence
          </button>
        </div>

        <p style={{marginTop:'40px', fontSize:'11px', color:'rgba(255,255,255,0.3)', lineHeight:'1.6'}}>
          Propriété exclusive de Samira Aït Aoudia Glibert<br/>
          Protection du droit d'auteur - CPI art. L111-1
        </p>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', background:'#f7f4ee', fontFamily:'sans-serif'}}>
       {/* Suite de ton interface... */}
       <header style={{padding:'20px', background:'white', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{fontSize:'18px', fontWeight:'700'}}>Mon <span style={{color:'#d85a30'}}>Cahier</span></h2>
          <span style={{fontSize:'11px', color:'#7a7568', background:'#f7f4ee', padding:'4px 10px', borderRadius:'20px'}}>Licence active : {localStorage.getItem('mci_active_licence')}</span>
       </header>
       <main style={{padding:'20px', maxWidth:'600px', margin:'0 auto'}}>
          <NoteEditor onSave={() => alert('Leçon enregistrée dans la base locale.')} />
       </main>
    </div>
  );
}
