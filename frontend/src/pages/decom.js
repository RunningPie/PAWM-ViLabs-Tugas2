import React, { useState, useEffect } from 'react';
import { useDragAndDrop, loadProgress, saveProgress, checkCategories } from '../hooks/decomUtil.js';
import '../styles/decom-style.css'; // Import the custom CSS file


const Decomposition = () => {
  const [items, setItems] = useState([
    { id: 'i1', text: 'Measure 2 cups of flour', dataCategory: 'ingredients' },
    { id: 'i2', text: 'Get 3 fresh eggs', dataCategory: 'ingredients' },
    { id: 'i3', text: 'Get 1 cup of sugar', dataCategory: 'ingredients' },
    { id: 'u1', text: 'Prepare mixing bowl', dataCategory: 'utensils' },
    { id: 'u2', text: 'Get measuring cups', dataCategory: 'utensils' },
    { id: 'u3', text: 'Find baking pan', dataCategory: 'utensils' },
    { id: 's1', text: 'Mix dry ingredients', dataCategory: 'steps' },
    { id: 's2', text: 'Preheat oven to 350°F', dataCategory: 'steps' },
    { id: 's3', text: 'Beat eggs until fluffy', dataCategory: 'steps' }
  ]);

  const updateItemCategory = (itemId, newCategory) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, category: newCategory } : item
      )
    );
  };

  const {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    feedback,
    setFeedback,
    feedbackColor,
    setFeedbackColor,
    isNextChapterEnabled,
    setIsNextChapterEnabled
  } = useDragAndDrop(updateItemCategory);

  useEffect(() => {
    const initializeProgress = async () => {
      const progress = await loadProgress();
      if (progress) {
        setItems(prevItems => {
          // Check if progress.items is empty
          if (!progress.items || progress.items.length === 0) {
            // If empty, set category to "main-recipe" for all items
            return prevItems.map(item => ({ ...item, category: "main-recipe" }));
          } else {
            // If not empty, use the original logic
            return prevItems.map(item => {
              const savedItem = progress.items.find(i => i.id === item.id);
              return savedItem ? { ...item, category: savedItem.category } : item;
            });
          }
        });
        
        if (!progress.reset && progress.completed) {
          setFeedback("Perfect! All tasks are in their correct categories! 🎉");
          setFeedbackColor('green');
          setIsNextChapterEnabled(true);
        }
      }
    };

    initializeProgress();
  }, []);

  const handleCheckCategories = async () => {
    const isCorrect = checkCategories(items);
    
    setFeedback(isCorrect 
      ? "Perfect! All tasks are in their correct categories! 🎉"
      : "Some tasks are in the wrong categories. Try again! 😊"
    );
    setFeedbackColor(isCorrect ? 'green' : 'red');
    setIsNextChapterEnabled(isCorrect);

    await saveProgress({
      exerciseId: 'decomposition',
      items: items.map(({ id, category }) => ({ id, category })),
      completed: isCorrect,
      reset: false
    });
  };

  const handleReset = async () => {
    setItems(prevItems => 
      prevItems.map(item => ({ ...item, category: 'main-recipe' }))
    );
    setFeedback("Exercise has been reset.");
    setFeedbackColor('black');
    setIsNextChapterEnabled(false);

    setTimeout(() => setFeedback(''), 3000);

    await saveProgress({
      exerciseId: 'decomposition',
      items: items.map(({ id }) => ({ id, category: 'main-recipe' })),
      completed: false,
      reset: true
    });
  };
  return (
    <div id="content-body">
      {/* Introduction Section */}
      <section className="introduction-section">
        <h2>Understanding Task Decomposition</h2>
        <p>Task decomposition is the process of breaking down a complex task into smaller, more manageable components. By dividing a task into its individual steps, we can better understand each part of the process, organize them logically, and complete them more efficiently.</p>
        
        <div className="img-container">
          <img src="/static/img/ch1-img1.svg" alt="Task Decomposition Illustration" />
        </div>

        <h3>Example of Task Decomposition: Planning a Picnic</h3>
        <p>Let's take a common task, like planning a picnic, and break it down into smaller tasks. Here's how task decomposition would work:</p>

        <div className="example-container">
          <div className="example-item">Pack food and drinks</div>
          <div className="example-item">Get picnic basket and blanket</div>
          <div className="example-item">Choose a location</div>
          <div className="example-item">Invite friends</div>
          <div className="example-item">Check the weather</div>
        </div>

        <p>As you can see, each of these steps contributes to the overall task of organizing a successful picnic. By breaking the task down into smaller parts, you ensure nothing is forgotten, and it becomes easier to manage each individual step!</p>
      </section>

      {/* Exercise Section */}
      <section className="exercise-section">
        <h2>Story Time!</h2>
        <p>Cooking is like solving a puzzle where timing and organization are everything 👩‍🍳. Imagine jumping into a complex recipe only to realize halfway through that you're missing a crucial ingredient or can't find your mixing bowl! Even experienced chefs know that success in the kitchen isn't just about following steps—it's about smart preparation.</p>
        <p>That's where breaking down a recipe into clear parts comes in handy. Professional chefs call this "mise en place" (everything in its place), and it's the difference between kitchen chaos and cooking with confidence. Ready to turn this jumbled recipe into an organized plan? Let's sort these tasks into their proper places!</p>
        <br/>
        <h3>Task Decomposition: Making a Complex Recipe</h3>
        <p>Organize these recipe steps into their appropriate categories by dragging them to the containers below.</p>
        
        <div id="interactive-exercise">
          <div 
            className="main-recipe-container subgroup-container"
            onDragOver={(e) => handleDragOver(e, 'main-recipe')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'main-recipe')}
          >
            {items.filter(item => item.category === 'main-recipe').map(item => (
              <div
                key={item.id}
                id={item.id}
                className="task-item"
                draggable={true}
                data-category={item.dataCategory}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div className="subgroup-containers">
            {['ingredients', 'utensils', 'steps'].map(category => (
              <div
                key={category}
                id={category}
                className="subgroup-container"
                onDragOver={(e) => handleDragOver(e, category)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, category)}
              >
                <div className="subgroup-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                {items.filter(item => item.category === category).map(item => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="task-item"
                    draggable={true}
                    data-category={item.dataCategory}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <button className="btn" onClick={handleCheckCategories}>
          Check Categories
        </button>
        <button className="btn" onClick={handleReset}>
          Reset Exercise
        </button>
        <div className="feedback" style={{ color: feedbackColor }}>
          {feedback}
        </div>
      </section>

      <div className="chapter-buttons">
        <button className="btn" disabled>
          <span className="material-symbols-rounded">chevron_left</span>
          Previous Chapter
        </button>
        <button className="btn" disabled={!isNextChapterEnabled}>
          Next Chapter
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Decomposition;