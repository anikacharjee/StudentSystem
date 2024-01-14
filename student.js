// Check if localStorage has student data
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to render students on the webpage
    function renderStudents() {
        const studentListContainer = $('#studentList');
        studentListContainer.empty();

        students.forEach((student, index) => {
            const studentCard = `
                <div class="student-card">
                    <p><strong>Name:</strong> ${student.name}</p>
                    <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                    <p><strong>Grade:</strong> ${student.grade}</p>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </div>
            `;
            studentListContainer.append(studentCard);
        });
    }

    // Function to add a new student
    function addStudent() {
        const name = $('#name').val();
        const rollNumber = $('#rollNumber').val();
        const grade = $('#grade').val();

        if (name && rollNumber && grade) {
            const newStudent = { name, rollNumber, grade };
            students.push(newStudent);

            // Update localStorage
            localStorage.setItem('students', JSON.stringify(students));

            // Clear form fields
            $('#name').val('');
            $('#rollNumber').val('');
            $('#grade').val('');

            // Render updated student list
            renderStudents();
        } else {
            alert('Please fill in all the details.');
        }
    }

    // Function to edit a student
    function editStudent(index) {
        const editedName = prompt('Enter the new name:', students[index].name);
        const editedRollNumber = prompt('Enter the new roll number:', students[index].rollNumber);
        const editedGrade = prompt('Enter the new grade:', students[index].grade);

        if (editedName !== null && editedRollNumber !== null && editedGrade !== null) {
            students[index].name = editedName;
            students[index].rollNumber = editedRollNumber;
            students[index].grade = editedGrade;

            // Update localStorage
            localStorage.setItem('students', JSON.stringify(students));

            // Render updated student list
            renderStudents();
        }
    }

    // Function to delete a student
    function deleteStudent(index) {
        students.splice(index, 1);

        // Update localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Render updated student list
        renderStudents();
    }

    // Function to filter students based on grade
    function filterStudents() {
        const filterValue = $('#gradeFilter').val();

        if (filterValue === 'all') {
            renderStudents();
        } else {
            const filteredStudents = students.filter(student => student.grade === filterValue);
            renderFilteredStudents(filteredStudents);
        }
    }

    // Function to render filtered students
    function renderFilteredStudents(filteredStudents) {
        const studentListContainer = $('#studentList');
        studentListContainer.empty();

        if (filteredStudents.length === 0) {
            studentListContainer.append('<p>No students found for the selected filter.</p>');
        } else {
            filteredStudents.forEach((student, index) => {
                const studentCard = `
                    <div class="student-card">
                        <p><strong>Name:</strong> ${student.name}</p>
                        <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                        <p><strong>Grade:</strong> ${student.grade}</p>
                        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                    </div>
                `;
                studentListContainer.append(studentCard);
            });
        }
    }

    // Initial rendering
    renderStudents();

 