import './MixWords.css'

function MixWords({words, addCombination}) {
    return (
        <div className="max">
            <div className='flex'>
                <p>1번 단어</p>
                <p>2번 단어</p>
            </div>
            <div className='flex' style={{justifyContent: 'center'}}>
                <buttton className='blue round noBorder button-m'>O</buttton>
                <buttton className='red round noBorder button-m'>X</buttton>
            </div>
        </div>
    )
}
export default MixWords;