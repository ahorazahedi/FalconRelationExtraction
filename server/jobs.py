import uuid
import time
import queue
from flask_socketio import emit


class Job:
    def __init__(self, text, user_sid):
        self.user_sid = user_sid
        self.job_id = str(uuid.uuid4())
        self.text = text
        self.status = 'IN_QUEUE'
        self.model_results = None
        self.update_user_status()
        # Create IN Queue Wait
        time.sleep(3)

    def update_user_status(self):
        emit('extract-relation_job_status', {'job_id': self.job_id, 'job_status': self.status,
             'job_result': self.model_results}, room=self.user_sid)

    def run(self):
        self.status = 'PROGRESSING'
        self.update_user_status()
        time.sleep(5)  # Model Progress Wait
        self.status = 'COMPLETED'
        self.model_results = {'nodes': [{'id': 1, 'label': 'alcohol', 'title': 'alcohol[ChemicalEntity]'}, {'id': 2, 'label': 'central nervous system depressants', 'title': 'central nervous system depressants[ChemicalEntity]'}, {'id': 3, 'label': 'chlordiazepoxide', 'title': 'chlordiazepoxide[ChemicalEntity]'}, {'id': 4, 'label': 'blood coagulation', 'title': 'blood coagulation[DiseaseOrPhenotypicFeature]'}, {'id': 5, 'label': 'anxiety', 'title': 'anxiety[DiseaseOrPhenotypicFeature]'}, {'id': 6, 'label': 'depression', 'title': 'depression[DiseaseOrPhenotypicFeature]'}, {
            'id': 7, 'label': 'insomniaaaaaaaa', 'title': 'insomnia[DiseaseOrPhenotypicFeature]'}], 'edges': [{'id': 1, 'from': 1, 'to': 2}, {'id': 2, 'from': 3, 'to': 2}, {'id': 3, 'from': 3, 'to': 4}, {'id': 4, 'from': 4, 'to': 1}, {'id': 5, 'from': 4, 'to': 3}, {'id': 6, 'from': 5, 'to': 3}, {'id': 7, 'from': 5, 'to': 1}, {'id': 8, 'from': 3, 'to': 6}, {'id': 9, 'from': 3, 'to': 7}, {'id': 10, 'from': 6, 'to': 3}, {'id': 11, 'from': 7, 'to': 3}, {'id': 12, 'from': 1, 'to': 7}, {'id': 13, 'from': 1, 'to': 6}, {'id': 14, 'from': 1, 'to': 3}, {'id': 15, 'from': 4, 'to': 1}, {'id': 16, 'from': 4, 'to': 3}]}

        emit('job_status', {'job_id': self.job_id, 'status': "COMPLETED",
             'results': self.model_results}, room=self.user_sid)
        self.update_user_status()


class Jobs:
    def __init__(self):
        self.jobs = queue.Queue()
        self.processing = False

    def add_job(self, job):
     
        self.jobs.put(job)
        if not self.processing:
            self.run_jobs()

    def remove_job(self, job_id):
        temp_queue = queue.Queue()
        while not self.jobs.empty():
            job = self.jobs.get()
            if job.job_id != job_id:
                temp_queue.put(job)
        self.jobs = temp_queue

    def edit_job(self, job_id, new_text):
        temp_queue = queue.Queue()
        while not self.jobs.empty():
            job = self.jobs.get()
            if job.job_id == job_id:
                job.text = new_text
            temp_queue.put(job)
        self.jobs = temp_queue

    def run_jobs(self):
        
        print("STARTING JOBS")
        self.processing = True
        while not self.jobs.empty():
            job = self.jobs.get()
            job.run()
        self.processing = False

    def get_jobs(self):
        jobs_list = []
        temp_queue = queue.Queue()
        while not self.jobs.empty():
            job = self.jobs.get()
            jobs_list.append(job)
            temp_queue.put(job)
        self.jobs = temp_queue
        return jobs_list
