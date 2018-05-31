import { Component, Input, OnInit, } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SectionService } from '../../section/section.service';
import { HostWindowService } from '../../../shared/host-window.service';
import { SubmissionService } from '../../submission.service';
import { SectionDataObject } from '../../section/section-data.model';

@Component({
  selector: 'ds-submission-form-section-add',
  styleUrls: [ './submission-form-section-add.component.scss' ],
  templateUrl: './submission-form-section-add.component.html'
})
export class SubmissionFormSectionAddComponent implements OnInit {
  @Input() collectionId: string;
  @Input() submissionId: string;

  public sectionList: Observable<SectionDataObject[]>;

  constructor(private sectionService: SectionService,
              private submissionService: SubmissionService,
              public windowService: HostWindowService) {
  }

  ngOnInit() {
    this.sectionList = this.submissionService.getDisabledSectionsList(this.submissionId);
  }

  addSection(sectionId) {
    this.sectionService.addSection(this.submissionId, sectionId);
  }
}
