"use client"
import { AxesInitialValues, AxesInterface } from '@/interface';
import { useAppData } from '@/context';
import { useEffect, useState } from 'react';
import { Languaje } from '../../config/languaje';
import styles from '../page.module.scss';
import './rotation.scss';

const Rotation = () => {
    const {lang} = useAppData();
    const key = lang;
    const {
        [key as keyof typeof Languaje]: {
            rotation: { formInputMatrixLabel, formButtonMatrixGenerate, matrixTitle, turnRight, turnLeft, dontArray, notArrayElements }
        }
    } = Languaje;

    const [elements, setElements] = useState<number[][]>([]);
    const [axes, setAxes] = useState<AxesInterface>(AxesInitialValues);
    const [input, setInput] = useState<string>('');
    const [lengthElements, setLengthElements] = useState<number>(0);
    const [variantClickRotation, setVariantClickRotation] = useState<number>(0);

    const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        setInput(value);
    }

    useEffect(()=>{
        if(input !== ""){
            GenerateMatrix();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[variantClickRotation]);

    const GenerateData = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        GenerateMatrix();
    }

    const GenerateMatrix = () => {
        try{
            const decoded:number[][] = JSON.parse(input);
            const valid:boolean = Array.isArray(decoded);
            const lengths: number[] = [];
            decoded.forEach((item)=>{
                lengths.push(item.length);
            });
            const isEqual = lengths.every( (val, i, arr) => val === arr[0] );
            if(valid){
                if(isEqual){
                    setElements(decoded);
                    setLengthElements(lengths[0]);
                    setAxes({...axes,columns: lengths[0],lines: decoded.length});
                }else{
                    alert(notArrayElements);
                }
            }
        }catch(err){
            alert(dontArray);
        }
    }

    const Rotate = (variant: number, clockwise: boolean) => {
        const newOrder:number[][] = [];
        let position = 0;
        for(let i=0; i<lengthElements; i++){
            if(!clockwise){
                position = lengthElements - (i + 1);
            }else{
                position = i;
            }

            const newItemArray: number[] = [];
            elements.map((item, index)=>{
                if(!clockwise){
                    newItemArray.push(item[position]);
                }else{
                    const newOrder = elements[elements.length - (index + 1)];
                    newItemArray.push(newOrder[position]);
                }
            })
            newOrder.push(newItemArray);
        }
        setInput(JSON.stringify(newOrder));
        setVariantClickRotation(variantClickRotation - variant);
    }

    return(
        <section className={styles.rotation}>
            <form className='form'>
                <div className="form__group">
                    <input
                        id='txtMatrix'
                        type="text"
                        value={input}
                        onChange={(e)=>{ChangeInput(e)}}
                        className="form__group__control"
                        required
                    />
                    <label className='form__group__label' htmlFor="txtMatrix">{formInputMatrixLabel}</label>
                </div>
                <div className="form__buttons">
                    <button onClick={(e)=>{GenerateData(e)}} className="form__buttons__button">{formButtonMatrixGenerate}</button>
                </div>
            </form>
            <div className="matrix">
                <h3 className='matrix__title'>{matrixTitle}</h3>
                <div className="matrix__wrapper">
                    <div className="matrix__wrapper__ctbutton">
                        <button className='matrix__wrapper__ctbutton__button' onClick={()=>{Rotate(-1, false)}}>{turnLeft}</button>
                    </div>
                    <div className='matrix__wrapper__matrix'>
                        {
                            elements.map((row, indexRow) => {
                                return(
                                    <div key={indexRow} className='matrix__wrapper__matrix__row'>
                                        {
                                            row.map((col, indexCol) => {
                                                return(
                                                    <div className="matrix__wrapper__matrix__row__item" key={`${indexRow}${indexCol}`}>
                                                        <span> {col} </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="matrix__wrapper__ctbutton">
                        <button className='matrix__wrapper__ctbutton__button' onClick={()=>{Rotate(+1, true)}} >{turnRight}</button>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Rotation;