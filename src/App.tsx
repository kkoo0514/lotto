import { useMemo, useState } from 'react'
import './App.css'
import { generateWithBonus, generateLottoNumbers } from './utils/lotto'

function App() {
  const [numbers, setNumbers] = useState<number[]>([])
  const [bonus, setBonus] = useState<number | null>(null)
  const [count] = useState<number>(6)
  const [range] = useState<{ min: number; max: number }>({ min: 1, max: 45 })

  const isValid = useMemo(() => {
    const availableCount = range.max - range.min + 1
    return count > 0 && count <= availableCount && range.min < range.max
  }, [count, range])

  const handleGenerate = (withBonus: boolean) => {
    if (!isValid) return
    if (withBonus) {
      const { numbers: ns, bonus: b } = generateWithBonus(count, range.min, range.max)
      setNumbers(ns)
      setBonus(b)
    } else {
      setNumbers(generateLottoNumbers(count, range.min, range.max))
      setBonus(null)
    }
  }

  return (
    <div className="container">
      <h1>로또 번호 생성기</h1>
      <div className="controls">
        <button disabled={!isValid} onClick={() => handleGenerate(false)}>생성</button>
        <button disabled={!isValid} onClick={() => handleGenerate(true)}>생성+보너스</button>
      </div>
      <div className="numbers">
        {numbers.map((n) => (
          <span key={n} className="ball">{n}</span>
        ))}
        {bonus !== null && (
          <span className="ball bonus" title="보너스">{bonus}</span>
        )}
      </div>
      {!isValid && (
        <p className="error">유효하지 않은 설정입니다. 범위와 개수를 확인하세요.</p>
      )}
    </div>
  )
}

export default App
