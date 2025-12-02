import React, { useState } from 'react';

const CircleOfFifths = () => {
  const [hoveredNote, setHoveredNote] = useState(null);
  const [hoveredType, setHoveredType] = useState(null); // 'major' o 'minor'
  const [pinnedNote, setPinnedNote] = useState(null);
  const [pinnedType, setPinnedType] = useState(null);
  const [visualMode, setVisualMode] = useState('functional'); // 'normal', 'functional', 'coltrane'
  const [expandedSection, setExpandedSection] = useState('modes'); // 'modes', 'theory', null
  
  // Determinar qué nota mostrar (pinned tiene prioridad sobre hover)
  const displayNote = pinnedNote || hoveredNote;
  const displayType = pinnedType || hoveredType;
  
  // Función para manejar el click y fijar/desfijar la nota
  const handleNoteClick = (note, type) => {
    if (pinnedNote === note && pinnedType === type) {
      // Si ya está fijada, desfijamos
      setPinnedNote(null);
      setPinnedType(null);
    } else {
      // Fijamos la nueva nota
      setPinnedNote(note);
      setPinnedType(type);
    }
  };
  
  // Notas del círculo de quintas en orden horario (tonalidades mayores)
  const majorKeys = [
    'C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'
  ];
  
  // Tonalidades menores relativas (círculo interior)
  const minorKeys = [
    'Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m/E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'
  ];
  
  // Función para obtener el índice de una nota
  const getNoteIndex = (note, type) => {
    const keys = type === 'major' ? majorKeys : minorKeys;
    return keys.indexOf(note);
  };
  
  // Función para obtener la dominante (quinta arriba, un paso horario)
  const getDominant = (note, type) => {
    const keys = type === 'major' ? majorKeys : minorKeys;
    const index = getNoteIndex(note, type);
    return keys[(index + 1) % keys.length];
  };
  
  // Función para obtener la subdominante (quinta abajo, un paso antihorario)
  const getSubdominant = (note, type) => {
    const keys = type === 'major' ? majorKeys : minorKeys;
    const index = getNoteIndex(note, type);
    return keys[(index - 1 + keys.length) % keys.length];
  };
  
  // Función para obtener la relativa (menor si es mayor, mayor si es menor)
  const getRelative = (note, type) => {
    const index = getNoteIndex(note, type);
    if (type === 'major') {
      return minorKeys[index];
    } else {
      return majorKeys[index];
    }
  };
  
  // Función para obtener las 7 notas mayores de la escala en el círculo de quintas
  // (nota seleccionada + 1 anterior + 5 siguientes)
  const getMajorKeysInScale = (tonic, type) => {
    // Si es menor, usar la relativa mayor como referencia
    const referenceTonic = type === 'minor' ? getRelative(tonic, 'minor') : tonic;
    const tonicIndex = getNoteIndex(referenceTonic, 'major');
    
    const scaleKeys = [];
    // 1 nota anterior (F si tónica es C)
    scaleKeys.push(majorKeys[(tonicIndex - 1 + majorKeys.length) % majorKeys.length]);
    // La tónica
    scaleKeys.push(majorKeys[tonicIndex]);
    // 5 notas siguientes (G, D, A, E, B si tónica es C)
    for (let i = 1; i <= 5; i++) {
      scaleKeys.push(majorKeys[(tonicIndex + i) % majorKeys.length]);
    }
    
    return scaleKeys;
  };
  
  // Función para obtener las notas del ciclo Coltrane (terceras mayores)
  // En el círculo de quintas, las terceras mayores están separadas por 4 pasos
  const getColtraneCycle = (note, type) => {
    const keys = type === 'major' ? majorKeys : minorKeys;
    const index = getNoteIndex(note, type);
    
    // Una tercera mayor arriba está 4 pasos adelante en el círculo de quintas
    // Otra tercera mayor arriba (desde la primera) está otros 4 pasos
    // Esto forma un triángulo equilátero
    const first = keys[(index + 4) % keys.length];   // Tercera mayor arriba
    const second = keys[(index + 8) % keys.length];  // Sexta mayor arriba (otra tercera desde la primera)
    
    return [first, second];
  };
  
  // Función para obtener todas las notas de una escala con sus cualidades (mayor/menor)
  const getScaleNotesWithQualities = (tonic, type) => {
    if (type === 'major') {
      // Para escalas mayores: I, ii, iii, IV, V, vi, vii°
      // Referencia correcta para C Mayor: C(I), Dm(ii), Em(iii), F(IV), G(V), Am(vi), B°(vii°)
      const tonicIndex = getNoteIndex(tonic, 'major');
      
      return [
        { note: majorKeys[tonicIndex], degree: 'I', quality: 'major', function: 'Tónica' },
        { note: minorKeys[(tonicIndex + 11) % minorKeys.length], degree: 'ii', quality: 'minor', function: 'Supertónica' },
        { note: minorKeys[(tonicIndex + 1) % minorKeys.length], degree: 'iii', quality: 'minor', function: 'Mediante' },
        { note: majorKeys[(tonicIndex + 11) % majorKeys.length], degree: 'IV', quality: 'major', function: 'Subdominante' },
        { note: majorKeys[(tonicIndex + 1) % majorKeys.length], degree: 'V', quality: 'major', function: 'Dominante' },
        { note: minorKeys[tonicIndex], degree: 'vi', quality: 'minor', function: 'Superdominante' },
        { note: minorKeys[(tonicIndex + 2) % minorKeys.length], degree: 'vii°', quality: 'diminished', function: 'Sensible' }
      ];
    } else {
      // Para escalas menores naturales: i, ii°, III, iv, v, VI, VII
      const tonicIndex = getNoteIndex(tonic, 'minor');
      
      return [
        { note: minorKeys[tonicIndex], degree: 'i', quality: 'minor', function: 'Tónica' },
        { note: minorKeys[(tonicIndex + 2) % minorKeys.length], degree: 'ii°', quality: 'diminished', function: 'Supertónica' },
        { note: majorKeys[tonicIndex], degree: 'III', quality: 'major', function: 'Mediante' },
        { note: minorKeys[(tonicIndex + 11) % minorKeys.length], degree: 'iv', quality: 'minor', function: 'Subdominante' },
        { note: minorKeys[(tonicIndex + 1) % minorKeys.length], degree: 'v', quality: 'minor', function: 'Dominante' },
        { note: majorKeys[(tonicIndex + 11) % majorKeys.length], degree: 'VI', quality: 'major', function: 'Superdominante' },
        { note: majorKeys[(tonicIndex + 1) % majorKeys.length], degree: 'VII', quality: 'major', function: 'Subtónica' }
      ];
    }
  };
  
  // Función simplificada para obtener solo las notas
  const getScaleNotes = (tonic, type) => {
    return getScaleNotesWithQualities(tonic, type).map(item => item.note);
  };
  
  // Función para obtener el grado de una nota específica en la escala
  const getScaleDegreeInfo = (note, tonic, type) => {
    const scaleNotes = getScaleNotesWithQualities(tonic, type);
    const found = scaleNotes.find(item => item.note === note);
    return found || null;
  };
  
  // Función para determinar el color de cada nota según su grado en la escala
  const getNoteColor = (note, type) => {
    if (!displayNote) return type === 'major' ? '#e0e0e0' : '#d0d0d0';
    
    // En modo normal, iluminar las 7 notas mayores en el círculo de quintas
    if (visualMode === 'normal') {
      // Solo trabajamos con el círculo mayor
      if (type === 'major') {
        // Nota seleccionada (o su relativa mayor si seleccionó menor)
        const referenceTonic = displayType === 'minor' ? getRelative(displayNote, 'minor') : displayNote;
        if (note === referenceTonic) return '#4a90e2'; // Tónica en azul
        
        // Verificar si está en las 7 notas mayores de la escala
        const scaleKeys = getMajorKeysInScale(displayNote, displayType);
        if (scaleKeys.includes(note)) {
          return '#90c890'; // Verde claro para notas de la escala
        }
      }
      
      return type === 'major' ? '#e0e0e0' : '#d0d0d0';
    }
    
    // Modo funcional (actual) - colores por función armónica
    if (visualMode === 'functional') {
      // Nota seleccionada (tónica)
      if (note === displayNote && type === displayType) return '#4a90e2';
      
      // Relativa menor/mayor
      if (note === getRelative(displayNote, displayType)) {
        if ((displayType === 'major' && type === 'minor') || 
            (displayType === 'minor' && type === 'major')) {
          return '#9b59b6';
        }
      }
      
      // Verificar si esta nota está en la escala del displayNote
      const degreeInfo = getScaleDegreeInfo(note, displayNote, displayType);
      
      if (degreeInfo) {
        const degree = degreeInfo.degree;
        
        // Acordes mayores
        if (degree === 'I' || degree === 'i') return '#4a90e2';
        if (degree === 'V' || degree === 'v') return '#e74c3c';
        if (degree === 'IV' || degree === 'iv') return '#2ecc71';
        
        // Otros grados
        if (degree === 'ii' || degree === 'ii°') return '#f39c12';
        if (degree === 'vi' || degree === 'VI') return '#3498db';
        if (degree === 'iii' || degree === 'III') return '#e67e22';
        if (degree === 'vii°' || degree === 'VII') return '#95a5a6';
      }
      
      return type === 'major' ? '#e0e0e0' : '#d0d0d0';
    }
    
    // Modo Coltrane - sin colores por función, solo destaca las notas de la escala
    if (visualMode === 'coltrane') {
      // Nota seleccionada (tónica)
      if (note === displayNote && type === displayType) return '#4a90e2';
      
      // Notas en la escala
      const degreeInfo = getScaleDegreeInfo(note, displayNote, displayType);
      if (degreeInfo) {
        return '#b0b0b0'; // Color neutro para notas de la escala
      }
      
      return type === 'major' ? '#e0e0e0' : '#d0d0d0';
    }
    
    return type === 'major' ? '#e0e0e0' : '#d0d0d0';
  };
  
  // Función para verificar si una nota está en el ciclo Coltrane
  const isInColtraneCycle = (note, type) => {
    if (visualMode !== 'coltrane' || !displayNote || type !== displayType) return false;
    const cycleNotes = getColtraneCycle(displayNote, displayType);
    return cycleNotes.includes(note);
  };
  
  // Función para obtener el número romano según la función armónica
  const getDegreeIcon = (degree) => {
    // Retornamos directamente el grado romano
    return degree;
  };
  
  // Calcular posición de cada nota en el círculo
  const getNotePosition = (index, type) => {
    const angle = (index * 30 - 90) * (Math.PI / 180); // 30 grados por nota, comenzando arriba
    const radius = type === 'major' ? 180 : 100; // Radio exterior para mayores, interior para menores
    const x = 250 + radius * Math.cos(angle);
    const y = 250 + radius * Math.sin(angle);
    return { x, y };
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
          Círculo de Quintas
        </h1>
        
        <div className="flex justify-center items-center overflow-x-auto">
          <svg 
            viewBox="-20 0 540 500" 
            className="mb-6 w-full h-auto max-w-[540px]"
          >
          {/* Círculos de fondo */}
          <circle cx="250" cy="250" r="200" fill="none" stroke="#d0d0d0" strokeWidth="2" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="#d0d0d0" strokeWidth="2" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* Líneas que conectan las notas mayores */}
          {majorKeys.map((_, index) => {
            const pos = getNotePosition(index, 'major');
            return (
              <line
                key={`line-major-${index}`}
                x1="250"
                y1="250"
                x2={pos.x}
                y2={pos.y}
                stroke="#e0e0e0"
                strokeWidth="1"
                opacity="0.2"
              />
            );
          })}
          
          {/* Líneas que conectan las notas menores */}
          {minorKeys.map((_, index) => {
            const pos = getNotePosition(index, 'minor');
            return (
              <line
                key={`line-minor-${index}`}
                x1="250"
                y1="250"
                x2={pos.x}
                y2={pos.y}
                stroke="#d0d0d0"
                strokeWidth="1"
                opacity="0.2"
              />
            );
          })}
          
          {/* Líneas que conectan relativas mayores-menores */}
          {majorKeys.map((_, index) => {
            const majorPos = getNotePosition(index, 'major');
            const minorPos = getNotePosition(index, 'minor');
            return (
              <line
                key={`relative-${index}`}
                x1={majorPos.x}
                y1={majorPos.y}
                x2={minorPos.x}
                y2={minorPos.y}
                stroke="#c0c0c0"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="3,3"
              />
            );
          })}
          
          {/* Notas Mayores (círculo exterior) */}
          {majorKeys.map((note, index) => {
            const { x, y } = getNotePosition(index, 'major');
            const color = getNoteColor(note, 'major');
            const degreeInfo = displayNote ? getScaleDegreeInfo(note, displayNote, displayType) : null;
            const isActive = displayNote && (
              (note === displayNote && 'major' === displayType) ||
              (note === getRelative(displayNote, displayType) && 'major' !== displayType) ||
              (degreeInfo && degreeInfo.quality === 'major')
            );
            const isPinned = note === pinnedNote && 'major' === pinnedType;
            const isColtrane = isInColtraneCycle(note, 'major');
            const icon = degreeInfo ? getDegreeIcon(degreeInfo.degree) : '';
            
            return (
              <g key={`major-${note}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 32 : 28}
                  fill={color}
                  stroke={isColtrane ? '#0066cc' : (isPinned ? '#d35400' : (isActive ? '#333' : '#999'))}
                  strokeWidth={isColtrane ? 4 : (isPinned ? 4 : (isActive ? 3 : 2))}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleNoteClick(note, 'major')}
                  onMouseEnter={() => {
                    if (!pinnedNote) {
                      setHoveredNote(note);
                      setHoveredType('major');
                    }
                  }}
                  onMouseLeave={() => {
                    if (!pinnedNote) {
                      setHoveredNote(null);
                      setHoveredType(null);
                    }
                  }}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill="#333"
                  fontSize={note.length > 2 ? '13' : '17'}
                  fontWeight="bold"
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {note}
                </text>
                {icon && isActive && (
                  <text
                    x={x + 20}
                    y={y - 15}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="14"
                    fontWeight="bold"
                    stroke="white"
                    strokeWidth="0.5"
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      paintOrder: 'stroke fill'
                    }}
                  >
                    {icon}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Notas Menores (círculo interior) */}
          {minorKeys.map((note, index) => {
            const { x, y } = getNotePosition(index, 'minor');
            const color = getNoteColor(note, 'minor');
            const degreeInfo = displayNote ? getScaleDegreeInfo(note, displayNote, displayType) : null;
            const isActive = displayNote && (
              (note === displayNote && 'minor' === displayType) ||
              (note === getRelative(displayNote, displayType) && 'minor' !== displayType) ||
              (degreeInfo && (degreeInfo.quality === 'minor' || degreeInfo.quality === 'diminished'))
            );
            const isPinned = note === pinnedNote && 'minor' === pinnedType;
            const isColtrane = isInColtraneCycle(note, 'minor');
            const icon = degreeInfo ? getDegreeIcon(degreeInfo.degree) : '';
            
            return (
              <g key={`minor-${note}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 28 : 24}
                  fill={color}
                  stroke={isColtrane ? '#0066cc' : (isPinned ? '#d35400' : (isActive ? '#333' : '#999'))}
                  strokeWidth={isColtrane ? 4 : (isPinned ? 4 : (isActive ? 3 : 2))}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleNoteClick(note, 'minor')}
                  onMouseEnter={() => {
                    if (!pinnedNote) {
                      setHoveredNote(note);
                      setHoveredType('minor');
                    }
                  }}
                  onMouseLeave={() => {
                    if (!pinnedNote) {
                      setHoveredNote(null);
                      setHoveredType(null);
                    }
                  }}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill="#333"
                  fontSize={note.length > 3 ? '11' : '14'}
                  fontWeight="bold"
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {note}
                </text>
                {icon && isActive && (
                  <text
                    x={x + 18}
                    y={y - 12}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="12"
                    fontWeight="bold"
                    stroke="white"
                    strokeWidth="0.5"
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      paintOrder: 'stroke fill'
                    }}
                  >
                    {icon}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        </div>
        
        {/* Selector de modos de visualización */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            onClick={() => setVisualMode('normal')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              visualMode === 'normal'
                ? 'bg-slate-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setVisualMode('functional')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              visualMode === 'functional'
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Funcional
          </button>
          <button
            onClick={() => setVisualMode('coltrane')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              visualMode === 'coltrane'
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Coltrane
          </button>
        </div>
        
        {/* Leyenda - solo en modo funcional */}
        {visualMode === 'functional' && (
          <div className="flex justify-center gap-2 sm:gap-3 mb-4 flex-wrap px-2">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#4a90e2'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">I/i (Tónica)</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#e74c3c'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">V/v (Dom)</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#2ecc71'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">IV/iv (Sub)</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#f39c12'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">ii/ii°</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#3498db'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">vi/VI</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#e67e22'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">iii/III</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#95a5a6'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">vii°/VII</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-700" style={{backgroundColor: '#9b59b6'}}></div>
              <span className="font-medium text-slate-700 whitespace-nowrap">Rel</span>
            </div>
          </div>
        )}
        
        {/* Información dinámica */}
        <div className="text-center bg-slate-50 rounded-lg p-4 sm:p-6 min-h-[160px] sm:min-h-[180px] flex items-center justify-center">
          {displayNote && displayType ? (
            <div className="w-full">
              <p className="text-base sm:text-lg text-slate-700 mb-2 sm:mb-3">
                <span className="font-bold text-[#4a90e2]">{displayNote}</span> 
                <span className="text-xs sm:text-sm ml-2">
                  ({displayType === 'major' ? 'Mayor' : 'Menor'})
                </span> - Tónica ({displayType === 'major' ? 'I' : 'i'})
                {pinnedNote && (
                  <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                    Fijada
                  </span>
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-slate-700 mb-2 sm:mb-3 max-w-xl mx-auto">
                {getScaleNotesWithQualities(displayNote, displayType).map((item) => {
                  let colorClass = '';
                  let chordQuality = '';
                  
                  if (item.degree === 'I' || item.degree === 'i') {
                    colorClass = 'text-[#4a90e2]';
                    chordQuality = item.quality === 'major' ? 'Mayor' : 'menor';
                  } else if (item.degree === 'V' || item.degree === 'v') {
                    colorClass = 'text-[#e74c3c]';
                    chordQuality = item.quality === 'major' ? 'Mayor' : 'menor';
                  } else if (item.degree === 'IV' || item.degree === 'iv') {
                    colorClass = 'text-[#2ecc71]';
                    chordQuality = item.quality === 'major' ? 'Mayor' : 'menor';
                  } else if (item.degree === 'ii' || item.degree === 'ii°') {
                    colorClass = 'text-[#f39c12]';
                    chordQuality = item.quality === 'diminished' ? 'dim' : 'menor';
                  } else if (item.degree === 'vi' || item.degree === 'VI') {
                    colorClass = 'text-[#3498db]';
                    chordQuality = item.quality === 'major' ? 'Mayor' : 'menor';
                  } else if (item.degree === 'iii' || item.degree === 'III') {
                    colorClass = 'text-[#e67e22]';
                    chordQuality = item.quality === 'major' ? 'Mayor' : 'menor';
                  } else if (item.degree === 'vii°' || item.degree === 'VII') {
                    colorClass = 'text-[#95a5a6]';
                    chordQuality = item.quality === 'diminished' ? 'dim' : 'Mayor';
                  }
                  
                  return (
                    <div key={item.note} className="text-left">
                      <span className={`font-bold ${colorClass}`}>{item.degree}:</span>{' '}
                      {item.note} <span className="text-slate-500 text-xs">({chordQuality})</span>
                    </div>
                  );
                })}
              </div>
              
              <p className="text-sm text-slate-500 pt-2 border-t border-slate-200">
                <span className="font-bold text-[#9b59b6]">Relativa {displayType === 'major' ? 'menor' : 'mayor'}:</span>{' '}
                {getRelative(displayNote, displayType)}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-slate-500 italic mb-2">
                Pasa el cursor sobre una nota para ver todos los grados de su escala
              </p>
              <p className="text-slate-400 text-sm">
                💡 Click en una nota para fijarla
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Información educativa */}
      <div className="mt-4 sm:mt-8 w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
        
        {/* Sección: Modos de Visualización */}
        <div className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'modes' ? null : 'modes')}
            className="w-full flex justify-between items-center text-xl sm:text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors"
          >
            <span>Modos de Visualización</span>
            <span className="text-2xl">{expandedSection === 'modes' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'modes' && (
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600 mt-3">
              <p>
                La aplicación ofrece tres modos de visualización para explorar diferentes aspectos del círculo de quintas:
              </p>
              
              <div className="bg-slate-100 p-4 rounded-lg mt-3">
                <p className="font-bold mb-2 text-slate-800">🔘 Modo Normal:</p>
                <p className="mb-2">
                  Visualiza el patrón fundamental del <strong>círculo de quintas</strong>. Ilumina las 7 notas mayores 
                  que forman la escala seleccionada siguiendo el patrón del círculo.
                </p>
                <p className="text-sm">
                  <strong>Patrón:</strong> 1 nota anterior + tónica + 5 notas siguientes en el círculo de quintas.
                </p>
                <p className="text-sm mt-1">
                  <strong>Ejemplo con C Mayor:</strong> F (anterior), C (tónica), G, D, A, E, B (siguientes).
                </p>
                <p className="text-sm mt-1 italic text-slate-500">
                  💡 Si seleccionas una nota menor, se usa su relativa mayor como referencia.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                <p className="font-bold mb-2 text-purple-900">🟣 Modo Funcional:</p>
                <p className="mb-2">
                  Muestra las <strong>funciones armónicas</strong> de cada grado de la escala con colores diferenciados 
                  y números romanos. Ideal para estudiar progresiones y relaciones tonales.
                </p>
                <p className="text-sm">
                  <strong>Colores por función:</strong> I/i (azul), V/v (rojo), IV/iv (verde), ii/ii° (naranja), etc.
                </p>
                <p className="text-sm mt-1">
                  Incluye tanto acordes mayores como menores, mostrando la cualidad de cada grado (I mayúscula = mayor, 
                  ii minúscula = menor, vii° = disminuido).
                </p>
                <p className="text-sm mt-2">
                  <strong>Ejemplo con C Mayor:</strong> Los acordes son C (I), Dm (ii), Em (iii), F (IV), G (V), Am (vi), B° (vii°)
                </p>
                <p className="text-sm mt-1">
                  <strong>Ejemplo con A menor:</strong> Los acordes son Am (i), B° (ii°), C (III), Dm (iv), Em (v), F (VI), G (VII)
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <p className="font-bold mb-2 text-blue-900">🔵 Modo Coltrane:</p>
                <p className="mb-2">
                  Visualiza el <strong>ciclo de terceras mayores</strong>, técnica popularizada por John Coltrane 
                  en "Giant Steps". Las notas del ciclo se marcan con borde azul.
                </p>
                <p className="text-sm">
                  <strong>Patrón:</strong> Desde cualquier nota, las terceras mayores están separadas por 4 posiciones 
                  en el círculo de quintas, formando un triángulo equilátero.
                </p>
                <p className="text-sm mt-1">
                  <strong>Ejemplo desde C:</strong> C → E (tercera mayor) → A♭ (otra tercera mayor) → C
                </p>
                <p className="text-sm mt-1 italic text-slate-500">
                  💡 Existen solo 4 ciclos posibles: C-E-A♭, D♭-F-A, D-F♯-B♭, E♭-G-B
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sección: Teoría Musical */}
        <div className="mb-4 border-t pt-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'theory' ? null : 'theory')}
            className="w-full flex justify-between items-center text-xl sm:text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors"
          >
            <span>Teoría Musical y Progresiones</span>
            <span className="text-2xl">{expandedSection === 'theory' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'theory' && (
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600 mt-3">
          <p>
            Cada grado de la escala tiene una cualidad específica (mayor, menor o disminuido) que se mantiene 
            consistente dentro de la tonalidad.
          </p>
          
          <div className="bg-slate-100 p-4 rounded-lg mt-3">
            <p className="font-bold mb-2">En escalas mayores:</p>
            <ul className="space-y-1 ml-4">
              <li><strong>I, IV, V</strong> son acordes <strong>mayores</strong> (mayúsculas)</li>
              <li><strong>ii, iii, vi</strong> son acordes <strong>menores</strong> (minúsculas)</li>
              <li><strong>vii°</strong> es acorde <strong>disminuido</strong></li>
            </ul>
          </div>
          
          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-bold mb-2">En escalas menores naturales:</p>
            <ul className="space-y-1 ml-4">
              <li><strong>i, iv, v</strong> son acordes <strong>menores</strong> (minúsculas)</li>
              <li><strong>III, VI, VII</strong> son acordes <strong>mayores</strong> (mayúsculas)</li>
              <li><strong>ii°</strong> es acorde <strong>disminuido</strong></li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mt-4">
            <p className="font-bold mb-3 text-blue-900">Progresiones armónicas más usuales:</p>
            
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-blue-800">En tonalidades mayores:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li><strong>I - IV - V - I</strong> (Progresión clásica básica)</li>
                  <li><strong>I - V - vi - IV</strong> (Progresión pop moderna, ej: C - G - Am - F)</li>
                  <li><strong>ii - V - I</strong> (Cadencia jazz/blues)</li>
                  <li><strong>I - vi - IV - V</strong> (Progresión doo-wop, años 50s)</li>
                  <li><strong>I - V - vi - iii - IV - I - IV - V</strong> (Canon de Pachelbel)</li>
                  <li><strong>I - IV - I - V</strong> (Blues básico de 12 compases)</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-blue-800">En tonalidades menores:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li><strong>i - iv - v - i</strong> (Progresión menor básica)</li>
                  <li><strong>i - VI - III - VII</strong> (Progresión menor natural)</li>
                  <li><strong>i - iv - VII - III</strong> (Andaluza/Flamenco descendente)</li>
                  <li><strong>i - VII - VI - VII</strong> (Rock menor)</li>
                  <li><strong>i - VI - iv - v</strong> (Balada melancólica)</li>
                </ul>
              </div>
              
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm italic text-blue-700">
                  💡 Tip: Las progresiones que incluyen I-IV-V (o i-iv-v en menor) son las más estables 
                  porque utilizan los tres acordes principales de la tonalidad.
                </p>
              </div>
            </div>
          </div>
          
          <p className="mt-4">
            <strong>Nota importante:</strong> El acorde vii° (sensible) es disminuido. En C Mayor es B° (B disminuido), 
            que se muestra en el círculo interior junto con los otros acordes menores, aunque técnicamente es disminuido, no menor.
          </p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CircleOfFifths;
