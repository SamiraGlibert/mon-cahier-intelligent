import React, { useState, useEffect } from 'react';
import NoteEditor from '../src/components/editor/NoteEditor';

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
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (FAMILY_CODES.includes(activationCode) || CLIENT_CODES.includes(activationCode)) {
      setIsLocked(false);
      localStorage.setItem('notebook_active', 'true');
    } else {
      setError('Code invalide. Veuillez contacter l\'administrateur.');
    }
  };

  if (isLocked) {
    return (
      <div style={{
        backgroundColor: '#0f0e0c',
        color: '#d4af37',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif'
      }}>
        <img src="/icon.png" alt="Plume" style={{ width: '100px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>MON CAHIER INTELLIGENT</h1>
        <div style={{ border: '1px solid #d4af37', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Activation requise</h3>
          <input 
            type="text" 
            placeholder="Entrez votre code"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            style={{ padding: '10px', width: '250px', marginTop: '10px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37' }}
          />
          <br />
          <button 
            onClick={handleUnlock}
            style={{ marginTop: '20px', padding: '10px 30px', backgroundColor: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ENTRER
          </button>
          {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return <NoteEditor />;
}
