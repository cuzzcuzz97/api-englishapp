import React, { useState } from 'react';
import { Vocab } from '../../particles';
import './vocablist.css';
import { deleteListVocab } from '../../api/auth'
import FormAddWord from '../FormAddWord/FormAddWord';

const VocabList = ({lists, getListVocab}) => {
  const [selectedList, setSelectedList] = useState("");
  const [vocab, setVocab] = useState([]);
  const [isVocabForm, setIsVocabForm] = useState(false)

  const handleListClick = (list) => {
    setSelectedList(list);
    getVocab(list.id);
  };

  const getVocab = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/app/vocab/${id}`);
      const jsonData = await response.json();
      setVocab(jsonData);
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddVocabForm = () => {
    setIsVocabForm(true)
  }

  const handleDelete = async (id) => {
        const willDelete = window.confirm('Are you sure you want to delete this vocabulary list?');
        if (willDelete) {
          deleteListVocab(id)
          setSelectedList(null)
          getListVocab()
        } else {

        }
}
 const handleLearning = (id) => {
    window.location.href = `/learning/${id}`;
 }


  if (selectedList) {
    return (
      <div className={`app__main-container__folder-vocab `}>
        <div className='app__main-container__folder-vocab__title'>
          <h3 className='heading text-center mb-4'>{selectedList.title}</h3>
        </div>
        <Vocab words={vocab} getVocab={getVocab} selectedList={selectedList}/>
        {/* <button>Edit</button> */}
        {isVocabForm ? (<>
        <FormAddWord words={vocab} list_id={selectedList.id} getVocab={getVocab} getListVocab={getListVocab}/>
        </>) : (<></>)}
        <button className='btn btn-info m-3' onClick={() => handleAddVocabForm()}>AddVocab</button>
        <button className='btn btn-success m-3' onClick={() => handleLearning(selectedList.id)}>Learning</button>
        <button className='btn btn-primary' onClick={() => setSelectedList(null)}>Return</button>
        <button className='btn btn-danger' onClick={() => handleDelete(selectedList.id)}>Delete</button>
      </div>
    );
  }

  return (
    <div className={`app__main-container__folder-listvocab `}>
                    {lists.map((list,index) => (
                        <div onClick={() => handleListClick(list)} key={index} className='app__main-container__folder-listvocab__item'>
                            <span>{index+1}.{list.title}</span>
                        </div>
                    ))}
                </div>
  );
};

export default VocabList