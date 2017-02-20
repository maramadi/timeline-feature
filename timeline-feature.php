<?php
if ( ! defined( 'ABSPATH' ) ) die();
if(
	! class_exists('MrmFeatureLoader') ||
	! class_exists('MrmFeature'))
{
	return;
}

Class TimelineFeature extends MrmFeature {

	public function __construct()
	{
		parent::__construct( 'Timeline', 'Transform elements to a timeline', __FILE__ );
	}

	public function settings()
	{
		$settings = array(

			'text' => array(
				'label'			=>	'Item class',
				'slug'			=>	'item_class',
				'description'	=>	'Put here the class name for each timeline item'
			)

		);

		return $settings;
	}

	public function run()
	{
		add_action( 'wp_head', array($this, 'printHeadScripts') );
		add_action( 'wp_print_footer_scripts', array($this, 'printFooterScripts') );
	}

	public function printHeadScripts()
	{
		$timelineClass = $this->getSetting('item-class')?:'timeline-item';
		echo '<script>';
		echo 'var timelineFeature_class="'. $timelineClass .'"';
		echo '</script>';
	}

	public function printFooterScripts()
	{
		echo '<script>';
		echo file_get_contents(__DIR__ . '/js/timeline.js');
		echo '</script>';
	}

}

$Timeline = new TimelineFeature();